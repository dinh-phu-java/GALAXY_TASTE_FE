import { ActionReducerMap } from '@ngrx/store';
import * as AuthReducer from '../services/auth-store/auth.reducer';

export interface AppState {
    auth: AuthReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: AuthReducer.authReducer
}