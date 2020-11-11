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
            return {
                ...state,
            }
        default:
            return state;
    }
}