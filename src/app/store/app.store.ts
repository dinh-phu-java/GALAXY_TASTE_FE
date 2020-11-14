import { ActionReducerMap } from '@ngrx/store';
import * as AuthReducer from '../services/auth-store/auth.reducer';
import * as ProductReducer from '../admin/product-store/product.reducer';
import * as UserReducer from 'src/app/user/user-store/user.reducer';
export interface AppState {
    auth: AuthReducer.State;
    product: ProductReducer.State;
    user: UserReducer.State
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: AuthReducer.authReducer,
    product: ProductReducer.productReducer,
    user: UserReducer.userReducer
}