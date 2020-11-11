import { Action } from '@ngrx/store';
import { User } from 'src/app/model/user.model';

export const LOGIN_START = '[Auth] Login Start';
export const SIGNUP_START = '[Auth] Signup Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const AUTHENTICATE_FAIL = '[Auth] Login Failed';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login';

export class AuthenticationSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;
    constructor(public payload: {user:User,token:string}) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: { email: string, password: string }) { }
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload: { email: string, password: string }) { }
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActionType = AuthenticationSuccess | Logout | LoginStart | AuthenticateFail | SignupStart | AutoLogin;
