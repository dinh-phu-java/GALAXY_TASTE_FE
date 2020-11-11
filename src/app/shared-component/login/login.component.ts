import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { HeaderType } from 'src/app/enum/header-type.enum';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Role } from 'src/app/enum/role.enum';
import { User } from 'src/app/model/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isLoading = false;
  subscription: Subscription;
  constructor(private authService: AuthenticationService,
    private notifier: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const loginUser = this.authService.getUserFormLocalCache();
    if (this.authService.isUserLoggedIn() && loginUser.role === Role.ADMIN) {
      this.router.navigate(['/admin/action']);
    }
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9]{6,}$")])
    })

  }

  onSubmit() {
    this.isLoading = true;
    this.subscription = this.authService.login(this.loginForm.value).subscribe((resData: HttpResponse<User>) => {
      this.isLoading = false;
      const token = resData.headers.get(HeaderType.JWT_TOKEN);
      const user = resData.body;
      console.log(user);
      this.authService.saveToken(token);
      this.authService.addUserToLocalCache(user);
      this.router.navigate(['/admin/action']);
    },
      (errorRes: HttpErrorResponse) => {
        console.log(errorRes);
        this.sendErrorNotification(NotificationType.ERROR, errorRes.error.message);
        this.isLoading = false;
      });


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
