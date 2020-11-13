import { Product } from 'src/app/model/product.model';
import * as ProductAction from './product.actions';

export interface State {
    currentProduct: Product;
    editProductCode: string;
    listProduct: Product[];
    loading: boolean;

}

const initialState: State = {
    currentProduct: null,
    editProductCode: null,
    listProduct: null,
    loading: false,

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
        case ProductAction.UPDATE_PRODUCT_FAILED:
            return {
                ...state,
                loading: false
            }
        case ProductAction.ACTION_FAILED:
        case ProductAction.GET_PRODUCT_LIST_FAILED:

            return {
                ...state,
                loading: false,
                editProductCode: null,
                currentProduct: null
            }

        case ProductAction.GET_PRODUCT_LIST_COMPLETE:
            return {
                ...state,
                listProduct: action.payload,
                loading: false
            }
        case ProductAction.START_UPDATE_PRODUCT:
            return {
                ...state,
                editProductCode: action.payload
            }
        case ProductAction.SET_CURRENT_PRODUCT:
            return {
                ...state,
                currentProduct: action.payload
            }
        case ProductAction.UPDATE_PRODUCT:
            return {
                ...state,
                loading: true
            }
        case ProductAction.UPDATE_PRODUCT_COMPLETE:
            return {
                ...state,
                editProductCode: null,
                currentProduct: null,
                loading: false
            }
        default:
            return state;
    }
}