import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Product } from 'src/app/model/product.model';
import * as ProductAction from './product.actions';
import {environment} from 'src/environments/environment';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Router } from '@angular/router';
@Injectable()
export class ProductEffects{
    private host= environment.apiUrl;
    constructor(
        private actions:Actions,
        private http:HttpClient,
        private notifier:NotificationService,
        private router:Router){}

    @Effect()
    createProduct= this.actions.pipe(
        ofType(ProductAction.CREATE_PRODUCT),
        switchMap((productData:ProductAction.CreateProduct)=>{
            return this.http
            .post<Product>(`${this.host}/product`,productData.payload)
            .pipe(
                map((resData:Product)=>{
                    console.log(resData);
                    
                    return new ProductAction.ActionComplete();
                }),
                catchError(errorRes=>{
                    console.log(errorRes)
                    return of(new ProductAction.ActionFailed());
                })
            )
        })
    )

    @Effect()
    getProductList=this.actions.pipe(
        ofType(ProductAction.GET_PRODUCT_LIST),
        switchMap((productData:ProductAction.GetProductList)=>{
            return this.http.get<Product[]>(`${this.host}/product/list`)
            .pipe(
                map((resData:Product[])=>{
                    
                    return new ProductAction.GetProductListComplete(resData);
                }),
                catchError(errorRes=>{
                    console.log(errorRes)
                    return of(new ProductAction.GetProductListFailed());
                })
            )
        })
    )

    @Effect({dispatch:false})
    actionComplete=this.actions.pipe(
        ofType(ProductAction.ACTION_COMPLETE),
        tap(()=>{
            this.notifier.notify(NotificationType.SUCCESS,`Upload file Complete`.toUpperCase());
        })
    )
    @Effect({dispatch:false})
    getProductListComplete=this.actions.pipe(
        ofType(ProductAction.GET_PRODUCT_LIST_COMPLETE),
        tap(()=>{
            this.notifier.notify(NotificationType.SUCCESS,`Get Product List Complete`.toUpperCase());
        })
    )

    @Effect({dispatch:false})
    getProductListFailed=this.actions.pipe(
        ofType(ProductAction.GET_PRODUCT_LIST_FAILED),
        tap(()=>{
            this.notifier.notify(NotificationType.ERROR,`Can't get list product! Please try again`.toUpperCase());
        })
    )

    @Effect()
    startUpdateProduct= this.actions.pipe(
        ofType(ProductAction.START_UPDATE_PRODUCT),
        switchMap((productCode:ProductAction.StartUpdateProduct)=>{
            return this.http.get<Product>(`${this.host}/product/${productCode.payload}`)
            .pipe(
                map((resData:Product)=>{
                    localStorage.setItem('editProduct',JSON.stringify(resData));
                    return new ProductAction.SetCurrentProduct(resData);
                }),
                catchError(errorRes=>{
                    
                    return of(new ProductAction.ActionFailed());
                })
            )
        })
    )
}