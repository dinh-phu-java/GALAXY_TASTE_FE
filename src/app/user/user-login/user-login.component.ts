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
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from 'src/app/model/user.model';
import { HeaderType } from 'src/app/enum/header-type.enum';

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
    private authService: AuthenticationService,
    private notifier: NotificationService,
    private router: Router,
    private store: Store<AppStore.AppState>,
    private socialAuthService: SocialAuthService,
    private http:HttpClient
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


    // this.socialAuthService.authState.subscribe(
    //   (user) => {
        // this.socialUser = user;
    //     // this.isLoggedIn = !!user;
        
    //     if (this.authService.checkToken(user.idToken)){
    //       this.http.
    //       post<HttpResponse<User>>(`${this.authService.host}/user/check-social-email`,this.socialUser,{observe:'response'})
    //       .subscribe(
    //         (resData)=>{
    //           console.log(resData);
    //           const user:User= <User>(resData.body);
    //           this.store.dispatch(new UserActions.LoginComplete({user:user,token:resData.headers.get(HeaderType.JWT_TOKEN)}))
    //       },
    //       errorRes=>{
    //         console.log(errorRes);
    //         this.store.dispatch(new UserActions.LoginFailed(errorRes.statusText));
    //       }
    //       );
    //     };
    //     console.log(user);
    //   }
    // )


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

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
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
