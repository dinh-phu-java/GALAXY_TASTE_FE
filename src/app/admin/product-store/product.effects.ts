import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/model/product.model';
import * as ProductAction from './product.actions';
import {environment} from 'src/environments/environment';
import { of } from 'rxjs';
@Injectable()
export class ProductEffects{
    private host= environment.apiUrl;
    constructor(private actions:Actions,private http:HttpClient){}

    @Effect()
    createProduct= this.actions.pipe(
        ofType(ProductAction.CREATE_PRODUCT),
        switchMap((productData:ProductAction.CreateProduct)=>{
            return this.http
            .post<Product>(`${this.host}/product`,productData.payload)
            .pipe(
                map((resData:Product)=>{
                    console.log(resData);
                    return of();
                }),
                catchError(errorRes=>{
                    console.log(errorRes)
                    return of();
                })
            )
        })
    )
}