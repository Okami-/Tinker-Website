import * as ActionTypes from './login/types';
import axios from 'axios';
import Cookies from 'js-cookie';

export function login(email, password) {
    return dispatch => {
        dispatch({
            type: ActionTypes.LOGIN_REQUESTED,
            email,
            password,
        });
        axios({
            method: "POST",
            url: "/api/login",
            data: {
                email: email,
                password: password
            },
            withCredentials: true,
        }).then(response => {
            dispatch({
                type: ActionTypes.LOGIN_SUCCEEDED,
                isAuthenticated: true,
                loggedUserobj: response.data,
            });
            Cookies.set('authority__loggedUserObj', response.data, { expires: 1 });
        }).catch(error => {
            if (error.response) {
                dispatch({
                    type: ActionTypes.LOGIN_FAILED,
                    error: error.response.data,
                });
            } else {
                dispatch({
                    type: ActionTypes.LOGIN_FAILED,
                    error: 'null'
                });
            }
            // console.log(error.response.data.message);
        })
    }
}

export function logout() {
    return dispatch => {
        axios({
            method: "GET",
            url: "/api/logout",
            withCredentials: true,
        }).then(response => {
            Cookies.remove('authority__loggedUserObj');
            dispatch({
                type: ActionTypes.LOGOUT_SUCCEEDED
            });
        }).catch(error => {
            if (error.response) {
                dispatch({
                    type: ActionTypes.LOGOUT_FAILED,
                    error: error.response.data,
                });
            } else {
                dispatch({
                    type: ActionTypes.LOGOUT_FAILED,
                    error: error.response
                });
            }
        })

    }
}