import { User } from 'src/app/model/user.model';
import { AuthActionType } from './auth.actions';
import * as AuthActions from './auth.actions';
import { Role } from 'src/app/enum/role.enum';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface State {
    user: User;
    token: string;
    loading: boolean;
    isLoggedIn:boolean;
    isAdmin:boolean;
}

const initialState: State = {
    user: null,
    token: null,
    loading: false,
    isLoggedIn:false,
    isAdmin:false
}

export function authReducer(state = initialState, action: AuthActions.AuthActionType) {
   let jwtHelper = new JwtHelperService();
    switch (action.type) {
        case AuthActions.LOGIN_START:
            return {
                ...state,
                loading:true
            }
        case AuthActions.AUTHENTICATE_SUCCESS:
            const authorize=action.payload.user.role === Role.ADMIN ? true : false;
            let isLogin=false;
            if (action.payload.token != null && action.payload.token !== '') {
                if (jwtHelper.decodeToken(action.payload.token).sub != null || '') {
                    if (!jwtHelper.isTokenExpired(action.payload.token)) {
                        isLogin= true;
                    }
                }
            } else {
                isLogin=false;
            }
            return {
                ...state,
                loading:false,
                user:action.payload.user,
                token:action.payload.token,
                isLoggedIn:isLogin,
                isAdmin:authorize
            }
        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                loading:false
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                user:null,
                token:null,
                loading:false,
                isLoggedIn:false,
                isAdmin:false
            }
        default:
            return state;
    }
}