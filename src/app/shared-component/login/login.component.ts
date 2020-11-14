import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import * as AppStore from '../../store/app.store';
import * as AuthActions from '../../services/auth-store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isLoading = false;
  public isAdmin=false;
  public isLoggedIn=false;
  subscription: Subscription;
  constructor(
    private authService: AuthenticationService,
    private notifier: NotificationService,
    private router: Router,
    private store: Store<AppStore.AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());

    this.subscription=this.store.select('auth').subscribe(stateData=>{
      this.isLoading=stateData.loading;
      this.isAdmin=stateData.isAdmin;
      this.isLoggedIn=stateData.isLoggedIn;
    });

    if(this.isLoggedIn){
      this.router.navigate(['/admin/action']);
    }

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9]{6,}$")])
    })

  }

  onSubmit() {
    this.store.dispatch(new AuthActions.LoginStart(this.loginForm.value));
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
