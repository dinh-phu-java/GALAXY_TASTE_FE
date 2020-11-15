import { Action } from '@ngrx/store';
import { User } from 'src/app/model/user.model';


export const START_REGISTER = '[User] Start Register';
export const REGISTER_COMPLETE = '[User] Register Complete';
export const REGISTER_FAILED = '[User] Register Failed';
export const START_LOGIN = '[User] Start Login';
export const LOGIN_COMPLETE = '[User] Login Complete';
export const LOGIN_FAILED = '[User] Login Failed';

export class StartLogin implements Action {
    readonly type = START_LOGIN;
    constructor(public payload: User) { }
}

export class LoginComplete implements Action {
    readonly type = LOGIN_COMPLETE;
    constructor(public payload:{user:User,token:string}){}
}

export class LoginFailed implements Action {
    readonly type = LOGIN_FAILED;
    constructor(public payload: string) { }
}

export class StartRegister implements Action {
    readonly type = START_REGISTER;
    constructor(public payload: User) { }
}

export class RegisterComplete implements Action {
    readonly type = REGISTER_COMPLETE;
}

export class RegisterFailed implements Action {
    readonly type = REGISTER_FAILED;
}

export type RegisterType =
    StartRegister |
    RegisterComplete |
    RegisterFailed |
    LoginComplete |
    StartLogin |
    LoginFailed;