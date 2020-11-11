import { Component, OnInit } from '@angular/core';
import * as AppStore from '../../../store/app.store';
import * as AuthActions from '../../../services/auth-store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  constructor(private store:Store<AppStore.AppState>) { }

  ngOnInit(): void {
    console.log('test in create product');
  }

}
