import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { HeaderType } from 'src/app/enum/header-type.enum';
import { User } from 'src/app/model/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as AppStore from 'src/app/store/app.store';
import * as UserActions from 'src/app/user/user-store/user.actions';
@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {
  public socialUser: SocialUser;
  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthenticationService,
    private http: HttpClient,
    private store: Store<AppStore.AppState>
  ) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(
      (user) => {
        this.socialUser = user;
        // this.isLoggedIn = !!user;

        if (this.authService.checkToken(user.idToken)) {
          this.http.
            post<HttpResponse<User>>(`${this.authService.host}/user/check-social-email`, this.socialUser, { observe: 'response' })
            .subscribe(
              (resData) => {
                console.log(resData);
                const user: User = <User>(resData.body);
                this.store.dispatch(new UserActions.LoginComplete({ user: user, token: resData.headers.get(HeaderType.JWT_TOKEN) }))
              },
              errorRes => {
                console.log(errorRes);
                this.store.dispatch(new UserActions.LoginFailed(errorRes.statusText));
              }
            );
        };
        console.log(user);
      }
    )
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
