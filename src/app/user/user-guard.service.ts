import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as AppStore from 'src/app/store/app.store';
import { NotificationType } from '../enum/notification-type.enum';
import { NotificationService } from '../services/notification.service';

@Injectable({providedIn:'root'})
export class UserGuard implements CanActivate{
    constructor(
        private store:Store<AppStore.AppState>,
        private router:Router,
        private notifier:NotificationService
        ){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select('user').pipe(
            take(1),
            map(userState=>{
                const isLoggedIn=userState.isLoggedIn;
                if(isLoggedIn){
                    return true;
                }else{
                    this.notifier.notify(NotificationType.WARNING,`Please login to access this page`.toUpperCase());
                    return this.router.createUrlTree(['/user/login']);
                }
            })
        )
    }
    
}