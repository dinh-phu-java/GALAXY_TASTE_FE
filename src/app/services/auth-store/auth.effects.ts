import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthenticationService } from '../authentication.service';
import * as AuthActions from './auth.actions';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from 'src/app/model/user.model';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from '../notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { HeaderType } from 'src/app/enum/header-type.enum';

@Injectable()
export class AuthEffects {
    private host = environment.apiUrl;
    constructor(
        private authService: AuthenticationService,
        private actions: Actions,
        private router: Router,
        private http: HttpClient,
        private notifier: NotificationService
    ) { }

    @Effect()
    authLogin = this.actions.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http
                .post<HttpResponse<User>>(`${this.host}/user/login`, authData.payload, { observe: 'response' })
                .pipe(
                    map(resData => {
                        return {
                            user: resData.body,
                            token: resData.headers.get(HeaderType.JWT_TOKEN)
                        };
                    }),
                    map(resData => {
                        const firstName = resData.user['firstName'];
                        const lastName = resData.user['lastName'];
                        const userName = resData.user['userName'];
                        const email = resData.user['email'];
                        const password = resData.user['password'];
                        const profileImageUrl = resData.user['profileImageUrl'];
                        const role = resData.user['role'];
                        const authorities = resData.user['authorities'];
                        const user = new User(firstName, lastName, userName, email, password, profileImageUrl, role, authorities);
                        const token = resData.token;
                        return new AuthActions.AuthenticationSuccess({ user: user, token: token });
                    }),
                    catchError(errorRes => {
                        const errorMessage = errorRes.error.message;
                        this.notifier.notify(NotificationType.ERROR, errorMessage);
                        return of(new AuthActions.AuthenticateFail());
                    })
                )
        })
    );

    @Effect({ dispatch: false })
    authenticationSuccess = this.actions.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authSuccessData: AuthActions.AuthenticationSuccess) => {
            this.authService.saveToken(authSuccessData.payload.token);
            this.authService.addUserToLocalCache(authSuccessData.payload.user);
            this.notifier.notify(NotificationType.SUCCESS,`Login Success with `.toUpperCase() +`${authSuccessData.payload.user.email}`);
            this.router.navigate(['/admin/action']);
        })
    )

    @Effect({ dispatch: false })
    logout = this.actions.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.logOut();
        })
    )

    @Effect()
    autoLogin = this.actions.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const token = localStorage.getItem('token');
            const user: User = this.authService.getUserFormLocalCache();
            if (this.authService.isUserLoggedIn() && user !== null) {
                return new AuthActions.AuthenticationSuccess({user:user,token:token});
            }else{
                return {type:'FAILED'}
            }
        })
    )

}