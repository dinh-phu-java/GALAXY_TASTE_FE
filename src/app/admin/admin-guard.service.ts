import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { NotificationType } from '../enum/notification-type.enum';
import { Role } from '../enum/role.enum';
import { User } from '../model/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';
import * as AppStore from '../store/app.store';
@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthenticationService,
        private router: Router,
        private notifier: NotificationService,
        private store: Store<AppStore.AppState>
    ) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                if (authState.isLoggedIn && authState.isAdmin) {
                    this.notifier.notify(NotificationType.SUCCESS, 'Welcome to Admin Page'.toUpperCase());
                    return true
                } else {
                    this.notifier.notify(NotificationType.WARNING, 'You don\'t have permission to access this page'.toUpperCase());
                    return this.router.createUrlTree(['/admin']);
                }
            })
        )

    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }

}