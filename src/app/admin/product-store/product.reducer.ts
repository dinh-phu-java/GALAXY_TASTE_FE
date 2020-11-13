import { Product } from 'src/app/model/product.model';
import * as ProductAction from './product.actions';

export interface State {
    currentProduct: Product;
    currentProductCode: number;
    editProductCode: number;
    listProduct: Product[];
    loading: boolean;

}

const initialState: State = {
    currentProduct: null,
    currentProductCode: null,
    editProductCode: null,
    listProduct: null,
    loading: false

}

export function productReducer(state = initialState, action: ProductAction.ProductType) {
    switch (action.type) {
        case ProductAction.CREATE_PRODUCT:
        case ProductAction.GET_PRODUCT_LIST:
            return {
                ...state,
                loading: true
            }
        case ProductAction.ACTION_COMPLETE:
            return {
                ...state,
                loading: false,
                imageFileName: null,
                imageFiles: null
            }
        case ProductAction.ACTION_FAILED:
        case ProductAction.GET_PRODUCT_LIST_FAILED:
            return {
                ...state,
                loading: false
            }

        case ProductAction.GET_PRODUCT_LIST_COMPLETE:
            return {
                ...state,
                listProduct: action.payload,
                loading: false
            }
        default:
            return state;
    }
}