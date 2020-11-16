import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import * as AppStore from 'src/app/store/app.store';
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
  constructor(private store: Store<AppStore.AppState>) { }

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

}
