import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { NotificationService } from './services/notification.service';
import * as UserActions from 'src/app/user/user-store/user.actions';
import * as AppStore from './store/app.store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'galaxyfrontend';
  constructor(private store: Store<AppStore.AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new UserActions.AutoLogin());
  }
}
