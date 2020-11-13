import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import * as AppStore from 'src/app/store/app.store';

import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class RequestIntercept implements HttpInterceptor, OnDestroy {
    private subscription: Subscription;
    constructor(
        private store: Store<AppStore.AppState>
        ,private authService:AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.includes(`${this.authService.host}/user/login`)) {
            return next.handle(request);
        }
        let token: string;
        this.subscription = this.store.select('auth').subscribe(
            (authData => {
                token = authData.token;
            })
        )
        
        const httpRequest = request.clone({ setHeaders: { Authorization: `Galaxy ${token}` } });
        return next.handle(httpRequest);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}