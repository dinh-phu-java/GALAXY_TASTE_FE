import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import {environment} from 'src/environments/environment';
import { User } from 'src/app/model/user.model';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
@Injectable()
export class UserEffects{
    private host = environment.apiUrl;
    constructor(
        private actions:Actions,
        private http:HttpClient,
        private notifier:NotificationService
        ){}

    @Effect()
    startRegister=this.actions.pipe(
        ofType(UserActions.START_REGISTER),
        switchMap((userData:UserActions.StartRegister)=>{
            return this.http
            .post<User>(`${this.host}/user/register`,userData.payload)
            .pipe(
                map(resData=>{
                    console.log(resData);
                    this.notifier.notify(NotificationType.SUCCESS,`register user complete`.toUpperCase());
                    return new UserActions.RegisterComplete();
                }),
                catchError(errorRes=>{
                    console.log(errorRes);
                    this.notifier.notify(NotificationType.ERROR,`${errorRes.error.message}`.toUpperCase());
                    return of(new UserActions.RegisterFailed());
                })
            )
        })
    )


}