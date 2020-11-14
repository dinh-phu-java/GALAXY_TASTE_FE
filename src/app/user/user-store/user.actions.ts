import { Action } from '@ngrx/store';
import { User } from 'src/app/model/user.model';


export const START_REGISTER='[User] Start Register';
export const REGISTER_COMPLETE='[User] Register Complete';
export const REGISTER_FAILED='[User] Register Failed';

export class StartRegister implements Action{
    readonly type=START_REGISTER;
    constructor(public payload:User){}
}

export class RegisterComplete implements Action{
    readonly type=REGISTER_COMPLETE;
}

export class RegisterFailed implements Action{
    readonly type=REGISTER_FAILED;
}

export type RegisterType=
 StartRegister | 
 RegisterComplete | 
 RegisterFailed;