import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as AppStore from '../../store/app.store';
import * as UserActions from 'src/app/user/user-store/user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isLoading = false;
  public isLoggedIn=false;
  subscription: Subscription;
  constructor(
    private authService: AuthenticationService,
    private notifier: NotificationService,
    private router: Router,
    private store: Store<AppStore.AppState>
  ) { }

  ngOnInit(): void {

    this.subscription=this.store.select('user').subscribe(stateData=>{
      this.isLoading=stateData.loading;
      this.isLoggedIn=stateData.isLoggedIn;
    });

    if(this.isLoggedIn){
      this.router.navigate(['/home']);
    }

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9]{6,}$")])
    })

  }

  onSubmit() {
    const email=this.loginForm.get('email').value;
    const password =this.loginForm.get('password').value;
    console.log(email);
    console.log(password);
    this.store.dispatch(new UserActions.StartLogin({email:email,password:password}));
    this.loginForm.reset();
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
