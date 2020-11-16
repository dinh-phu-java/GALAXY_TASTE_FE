import { ActionComponent } from 'src/app/admin/action/action.component';
import { User } from 'src/app/model/user.model';
import * as UserActions from './user.actions';

export interface State {
    loading: boolean;
    registerUser: User;
    loginUser: User;
    isLoggedIn: boolean;
}

const initialState: State = {
    loading: false,
    registerUser: null,
    loginUser: null,
    isLoggedIn: false
}

export function userReducer(state = initialState, action: UserActions.RegisterType) {
    switch (action.type) {
        case UserActions.START_REGISTER:
            return {
                ...state,
                loading: true,
                registerUser: action.payload
            }
        case UserActions.REGISTER_COMPLETE:
            return {
                ...state,
                loading: false
            }
        case UserActions.REGISTER_FAILED:
            return {
                ...state,
                loading: false,
                registerUser: null
            }
        case UserActions.LOGIN_COMPLETE:
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                loginUser: action.payload.user
            }
        case UserActions.LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                loginUser: null,
                isLoggedIn: false
            }
        case UserActions.START_LOGIN:
            return {
                ...state,
                loading: true,
                loginUser: action.payload
            }
        case UserActions.LOGOUT:
            return {
                ...state,
                loading: false,
                loginUser: null,
                isLoggedIn: false
            }
        default:
            return state;
    }
}