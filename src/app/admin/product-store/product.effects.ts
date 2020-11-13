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
    editProduct=this.actions.pipe(
        ofType(ProductAction.UPDATE_PRODUCT),
        switchMap((productData:ProductAction.UpdateProduct)=>{
            return this.http
            .put<Product>(`${this.host}/product/${productData.payload.productCode}`,productData.payload.newProductFormData)
            .pipe(
                map(resData=>{
                    console.log(resData);
                    
                    return new ProductAction.UpdateProductComplete();
                }),
                catchError(errorRes=>{
                    return of(new ProductAction.UpdateProductFailed());
                })
            )
        })
    )

    @Effect({dispatch:false})
    updateProductComplete=this.actions.pipe(
        ofType(ProductAction.UPDATE_PRODUCT_COMPLETE),
        tap(()=>{
            this.notifier.notify(NotificationType.SUCCESS,`update product Complete`.toUpperCase());
            this.router.navigate(['/admin/action']);
        })
    )

    @Effect({dispatch:false})
    updateProductFailed=this.actions.pipe(
        ofType(ProductAction.UPDATE_PRODUCT_FAILED),
        tap(()=>{
            this.notifier.notify(NotificationType.ERROR,`Can't update Product. Please try Again`.toUpperCase());
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
                    
                    return new ProductAction.SetCurrentProduct(resData);
                }),
                catchError(errorRes=>{
                    
                    return of(new ProductAction.ActionFailed());
                })
            )
        })
    )

    @Effect()
    deleteProduct=this.actions.pipe(
        ofType(ProductAction.DELETE_PRODUCT),
        switchMap((productCode:ProductAction.DeleteProduct)=>{
            return this.http.delete<Product>(`${this.host}/product/${productCode.payload}`)
            .pipe(
                map(resData=>{
                    console.log(resData);
                    // return new ProductAction.DeleteProductComplete();
                    this.notifier.notify(NotificationType.SUCCESS,`Delete Product Complete`.toUpperCase());
                    return new ProductAction.GetProductList();
                }),
                catchError(errorRes=>{
                    this.notifier.notify(NotificationType.ERROR,`Delete Product Failed`.toUpperCase());
                    return of(new ProductAction.DeleteProductFailed());
                })
            )
        })
    )

}