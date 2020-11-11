import { Component, OnInit } from '@angular/core';
import * as AppStore from '../../../store/app.store';
import * as AuthActions from '../../../services/auth-store/auth.actions';
import { Store } from '@ngrx/store';
import * as ProductAction from 'src/app/admin/product-store/product.actions';
import { Product } from 'src/app/model/product.model';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  constructor(private store: Store<AppStore.AppState>) { }

  ngOnInit(): void {
    console.log('test in create product');
  }
  createProduct() {
    const product = new Product(null,'product name',234.2,'#product tag','product description',['image1','image2'],1);
    // const product = new Product();
    this.store.dispatch(new ProductAction.CreateProduct(product));
  }
}
