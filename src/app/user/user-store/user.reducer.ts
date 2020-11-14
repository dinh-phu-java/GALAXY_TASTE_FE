import { User } from 'src/app/model/user.model';
import * as UserActions from './user.actions';

export interface State {
    loading: boolean;
    registerUser: User;
}

const initialState: State = {
    loading: false,
    registerUser: null
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
        case UserActions.REGISTER_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}