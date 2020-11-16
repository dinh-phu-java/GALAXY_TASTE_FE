import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as AppStore from 'src/app/store/app.store';
import * as UserActions from 'src/app/user/user-store/user.actions';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userForm: FormGroup;
  public userProfile: User;
  subscription: Subscription;
  public isLoading:boolean=false;
  constructor(
    private store: Store<AppStore.AppState>,
    private authService:AuthenticationService,
    private router:Router) { }

  ngOnInit(): void {
    this.subscription = this.store.select('user').subscribe(
      userState => {
        this.userProfile = userState.loginUser;
      }
    )

    this.userForm = new FormGroup({
      'userName': new FormControl(this.userProfile.username, [Validators.required]),
      'email': new FormControl(this.userProfile.email, [Validators.required, Validators.email]),
      'firstName': new FormControl(this.userProfile.firstName, [Validators.required]),
      'lastName': new FormControl(this.userProfile.lastName, [Validators.required])
    })

  }

  onSubmit() {

  }
  logout(){
    this.authService.logOut();
    this.store.dispatch(new UserActions.Logout());
    this.router.navigate(['/home']);
  }

}
