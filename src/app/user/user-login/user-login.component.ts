import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { NotificationService } from 'src/app/services/notification.service';
import * as AppStore from '../../store/app.store';
import * as UserActions from 'src/app/user/user-store/user.actions';
import { Store } from '@ngrx/store';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isLoading = false;
  public isLoggedIn = false;
  public socialUser: SocialUser;

  subscription: Subscription[]=[];
  constructor(
    private notifier: NotificationService,
    private router: Router,
    private store: Store<AppStore.AppState>,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9]{6,}$")])
    })

    this.subscription.push(this.store.select('user').subscribe(stateData => {
      this.isLoading = stateData.loading;
      this.isLoggedIn = stateData.isLoggedIn;
    }));


    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    }


  }

  onSubmit() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    console.log(email);
    console.log(password);
    this.store.dispatch(new UserActions.StartLogin({ email: email, password: password }));
    this.loginForm.reset();
  }


  signOut(): void {
    this.socialAuthService.signOut();
  }

  public sendErrorNotification(type: NotificationType, message: string) {
    if (message) {
      this.notifier.notify(type, message);
    } else {
      this.notifier.notify(type, 'An error occurred. Please try again!');
    }
  }

  ngOnDestroy(): void {
    for (let sub of this.subscription) {
      if (sub) {
        sub.unsubscribe();
      }
    }
  }

}
