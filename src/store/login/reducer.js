import initialState from '../initialState'
import * as ActionTypes from './types';

export default function access(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCEEDED: {
            return {
                ...state,
                user: {
                    ...state.user,
                    isAuthenticated: true,
                    loggedUserObj: action.user
                },
                error: null,
            };
        }
        case ActionTypes.LOGIN_FAILED: {
            return {
                ...state,
                error: action.error,
            };
        }
        case ActionTypes.LOGOUT_SUCCEEDED: {
            return {
                ...state,
                user: {
                    isAuthenticated: false,
                },
                error: null,
            };
        }
        default:
            return state;
    }
}