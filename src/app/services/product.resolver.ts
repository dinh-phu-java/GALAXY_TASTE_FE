import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import * as AppStore from 'src/app/store/app.store';
import { Store } from '@ngrx/store';
import * as ProductAction from 'src/app/admin/product-store/product.actions';
import { map } from 'rxjs/operators';
@Injectable({providedIn:'root'})
export class ProductResolver implements Resolve<Product[]>{

    constructor(private store:Store<AppStore.AppState>){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
        this.store.dispatch(new ProductAction.GetProductList());
        return this.store.select('product').pipe(
            map((productState)=>{
                console.log(productState.listProduct);
                
              return productState.listProduct;  
            })
        )
    }

}