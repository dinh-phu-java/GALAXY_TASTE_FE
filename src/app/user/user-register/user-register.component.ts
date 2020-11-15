import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as AppStore from '../../store/app.store';
import * as UserActions from 'src/app/user/user-store/user.actions';
import { Store } from '@ngrx/store';
import * as $ from 'jquery';
import { User } from 'src/app/model/user.model';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit, OnDestroy {

  public registerForm;
  public isLoading = false;
  public isPasswordMatch = false;
  subscription: Subscription;
  constructor(
    private authService: AuthenticationService,
    private notifier: NotificationService,
    private router: Router,
    private store: Store<AppStore.AppState>,
    private formBuilder: FormBuilder

  ) {



  }

  ngOnInit(): void {

    let confirmPass = $('#confirmPassword');
    let pass = $('#password');

    confirmPass.blur(() => {
      if (confirmPass.val() !== pass.val() && pass.val() !== '') {
        console.log(confirmPass.val());
        this.notifier.notify(NotificationType.ERROR, `Password doesn't match`.toUpperCase());
      }
    })

    pass.blur(() => {
      console.log(confirmPass.val());
      if (confirmPass.val() !== '' && confirmPass.val() !== pass.val()) {

        this.notifier.notify(NotificationType.ERROR, `Password doesn't match`.toUpperCase());

      }
    })


    this.subscription = this.store.select('user').subscribe(stateData => {
      this.isLoading = stateData.loading;
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{6,}$")]],
        confirmPassword: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{6,}$")]],
      }, { validator: this.passwordConfirming }),

    });


  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.value.password !== c.value.confirmPassword) {
      return { invalid: true };
    }
  }

  onSubmit() {
    const email=this.registerForm.get('email').value;
    const firstName=this.registerForm.get('firstName').value;
    const lastName=this.registerForm.get('lastName').value;
    const username=this.registerForm.get('username').value;
    const password=this.registerForm.get('passwords').get('password').value;
    const registerUser:User = new User(firstName,lastName,username,email,password);
    console.log(registerUser);
    this.store.dispatch(new UserActions.StartRegister(registerUser));
  }

  public sendErrorNotification(type: NotificationType, message: string) {
    if (message) {
      this.notifier.notify(type, message);
    } else {
      this.notifier.notify(type, 'An error occurred. Please try again!');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
