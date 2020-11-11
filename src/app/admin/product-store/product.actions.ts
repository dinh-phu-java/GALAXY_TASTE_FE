import { Action, UPDATE } from '@ngrx/store';
import { Product } from 'src/app/model/product.model';

export const CREATE_PRODUCT = '[Product] Create';
export const UPDATE_PRODUCT = '[Product] Update';
export const DELETE_PRODUCT = '[Product] Delete';
export const GET_PRODUCT_LIST = '[Product] Get Product List';
export const GET_PRODUCT = '[Product] Get Product'

export class CreateProduct implements Action {
    readonly type = CREATE_PRODUCT;
    constructor(public payload: Product) { }
}

export class UpdateProduct implements Action {
    readonly type = UPDATE_PRODUCT;
    constructor(public payload: { newProduct: Product, productId: number }) { }
}

export class DeleteProduct implements Action {
    readonly type = DELETE_PRODUCT;
    constructor(public payload: number) { }
}

export class GetProductList implements Action {
    readonly type = GET_PRODUCT_LIST;
}

export class GetProduct implements Action {
    readonly type = GET_PRODUCT;
    constructor(public payload: number) { }
}

export type ProductType = CreateProduct | UpdateProduct | DeleteProduct | GetProductList | GetProduct;
