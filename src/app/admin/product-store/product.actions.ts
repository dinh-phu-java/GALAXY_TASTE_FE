import { Action, UPDATE } from '@ngrx/store';
import { Product } from 'src/app/model/product.model';

export const CREATE_PRODUCT = '[Product] Create';
export const START_UPDATE_PRODUCT='[Product] Start Update';
export const UPDATE_PRODUCT = '[Product] Update';
export const DELETE_PRODUCT = '[Product] Delete';
export const GET_PRODUCT_LIST = '[Product] Get Product List';
export const GET_PRODUCT = '[Product] Get Product';
export const ACTION_COMPLETE = '[Product] Complement';
export const ACTION_FAILED = '[Product] Failed';
export const GET_PRODUCT_LIST_COMPLETE='[Product] Get Product List Complete';
export const GET_PRODUCT_LIST_FAILED='[Product] Get Product List Failed';
export const SET_CURRENT_PRODUCT='[Product] Set Current Product';
export const UPDATE_PRODUCT_COMPLETE='[Product] Update Product Complete';
export const UPDATE_PRODUCT_FAILED='[Product] Update Product Failed';
export const DELETE_PRODUCT_COMPLETE = '[Product] Delete Product Complete';
export const DELETE_PRODUCT_FAILED = '[Product] Delete Product Failed';



export class UpdateProductFailed implements Action{
    readonly type=UPDATE_PRODUCT_FAILED;
}
export class UpdateProductComplete implements Action{
    readonly type=UPDATE_PRODUCT_COMPLETE;
}

export class SetCurrentProduct implements Action{
    readonly type=SET_CURRENT_PRODUCT;
    constructor(public payload:Product){}
}

export class StartUpdateProduct implements Action{
    readonly type=START_UPDATE_PRODUCT;
    constructor(public payload:string){}
}

export class GetProductListComplete implements Action{
    readonly type=GET_PRODUCT_LIST_COMPLETE;
    constructor(public payload:Product[]){}
}

export class GetProductListFailed implements Action{
    readonly type=GET_PRODUCT_LIST_FAILED;
}

export class ActionFailed implements Action {
    readonly type = ACTION_FAILED;
}

export class ActionComplete implements Action {
    readonly type = ACTION_COMPLETE;
}
export class CreateProduct implements Action {
    readonly type = CREATE_PRODUCT;
    constructor(public payload: FormData) { }
}

export class UpdateProduct implements Action {
    readonly type = UPDATE_PRODUCT;
    constructor(public payload: { newProductFormData: FormData, productCode: string }) { }
}

export class DeleteProduct implements Action {
    readonly type = DELETE_PRODUCT;
    constructor(public payload: string) { }
}

export class GetProductList implements Action {
    readonly type = GET_PRODUCT_LIST;
}

export class GetProduct implements Action {
    readonly type = GET_PRODUCT;
    constructor(public payload: number) { }
}

export class DeleteProductComplete implements Action{
    readonly type=DELETE_PRODUCT_COMPLETE;
}

export class DeleteProductFailed implements Action{
    readonly type=DELETE_PRODUCT_FAILED;
}

export type ProductType =
    CreateProduct |
    UpdateProduct |
    DeleteProduct |
    GetProductList |
    GetProduct |
    ActionComplete |
    ActionFailed |
    GetProductListComplete |
    GetProductListFailed|
    StartUpdateProduct |
    SetCurrentProduct |
    UpdateProductComplete |
    UpdateProductFailed |
    DeleteProductComplete |
    DeleteProductFailed
    ;
