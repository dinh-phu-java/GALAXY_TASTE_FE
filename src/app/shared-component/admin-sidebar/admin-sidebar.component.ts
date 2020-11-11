import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as AppStore from '../../store/app.store';
import * as AuthActions from '../../services/auth-store/auth.actions';
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

  constructor(private authService:AuthenticationService,private store:Store<AppStore.AppState>) { }

  ngOnInit(): void {
  }

  logout(){
    this.store.dispatch(new AuthActions.Logout());
  }
}
