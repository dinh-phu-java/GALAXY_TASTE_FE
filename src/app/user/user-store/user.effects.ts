import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user.model';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Router } from '@angular/router';
import { HeaderType } from 'src/app/enum/header-type.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Injectable()
export class UserEffects {
    private host = environment.apiUrl;
    constructor(
        private actions: Actions,
        private http: HttpClient,
        private notifier: NotificationService,
        private router: Router,
        private authService:AuthenticationService
    ) { }

    @Effect()
    startRegister = this.actions.pipe(
        ofType(UserActions.START_REGISTER),
        switchMap((userData: UserActions.StartRegister) => {
            return this.http
                .post<User>(`${this.host}/user/register`, userData.payload)
                .pipe(
                    map(resData => {
                        console.log(resData);
                        this.notifier.notify(NotificationType.SUCCESS, `register user complete`.toUpperCase());
                        return new UserActions.RegisterComplete();
                    }),
                    catchError(errorRes => {
                        console.log(errorRes);
                        this.notifier.notify(NotificationType.ERROR, `${errorRes.error.message}`.toUpperCase());
                        return of(new UserActions.RegisterFailed());
                    })
                )
        })
    )

    @Effect({ dispatch: false })
    registerComplete = this.actions.pipe(
        ofType(UserActions.REGISTER_COMPLETE),
        tap(() => {

        })
    )

    @Effect()
    startLogin = this.actions.pipe(
        ofType(UserActions.START_LOGIN),
        switchMap((loginData: UserActions.StartLogin) => {
            return this.http
                .post<HttpResponse<User>>(`${this.host}/user/login`, loginData.payload,{observe:'response'})
                .pipe(
                    map(resData=>{
                        return {
                            user:resData.body,
                            token:resData.headers.get(HeaderType.JWT_TOKEN)
                        }
                    }),
                    map(resData => {
                        
                        const user:User =(<User>resData.user);
                        console.log(user);
                        return new UserActions.LoginComplete({user:user,token:resData.token});
                    }),
                    catchError(errorRes => {
                        console.log(errorRes)
                        return of(new UserActions.LoginFailed(errorRes.error.message));
                    })
                )
        })
    )

    @Effect({ dispatch: false })
    loinComplete = this.actions.pipe(
        ofType(UserActions.LOGIN_COMPLETE),
        tap((userData:UserActions.LoginComplete) => {
            this.notifier.notify(NotificationType.SUCCESS, `Login Complete`.toUpperCase());
            this.authService.saveToken(userData.payload.token);
            this.authService.addUserToLocalCache(userData.payload.user);
            this.router.navigate(['/home']);
        })
    )

    @Effect({ dispatch: false })
    loginFailed = this.actions.pipe(
        ofType(UserActions.LOGIN_FAILED),
        tap((errorData: UserActions.LoginFailed) => {
            this.notifier.notify(NotificationType.ERROR, `${errorData.payload}`.toUpperCase());
        })
    )

}