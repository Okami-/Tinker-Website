import * as ActionTypes from './types';
import axios from 'axios';

export function fetchPosts(posts) {
    return dispatch => {
        dispatch({
            type: ActionTypes.FETCH_POSTS,
            loading: true,
        });
        axios({
            method: "GET",
            url: "/api/posts",
            data: posts,
        }).then(response => {
            dispatch({
                type: ActionTypes.FETCH_POSTS_SUCCESS,
                payload: [response.data]
            });

        }).catch(error => {
            if (error.response) {
                dispatch({
                    type: ActionTypes.FETCH_POSTS_FAILURE,
                    payload: error,
                });
            } else {
                dispatch({
                    type: ActionTypes.FETCH_POSTS_FAILURE,
                    error: 'null'
                });
            }
        })
    }
}

export function fetchPostsSuccess(posts) {
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: posts
    };
}

export function fetchPostsFailure(error) {
    return {
        type: FETCH_POSTS_FAILURE,
        payload: error
    };
}

export function createPost(props) {
    return dispatch => {
        axios({
            method: "POST",
            url: "/api/posts",
            data: props,
        }).then(response => {
            dispatch({
                type: ActionTypes.CREATE_POST_SUCCESS,
            });
            history.push('/blog');
        }).catch(error => {
            if (error.response) {
                dispatch({
                    type: ActionTypes.CREATE_POST_FAILURE,
                    error: error.response.data,
                });
            } else {
                dispatch({
                    type: ActionTypes.CREATE_POST_SUCCESS,
                    error: 'null'
                });
            }
            // console.log(error.response.data.message);
        })
    }
}

export function createPostSuccess(newPost) {
    return {
        type: CREATE_POST_SUCCESS,
        payload: newPost
    };
}

export function createPostFailure(error) {
    return {
        type: CREATE_POST_FAILURE,
        payload: error
    };
}

export function resetNewPost() {
    return {
        type: RESET_NEW_POST
    }
}
;

export function resetDeletedPost() {
    return {
        type: RESET_DELETED_POST
    }
}
;

export function fetchPost(props) {
    return dispatch => {
        axios({
            method: "GET",
            url: "/api/posts",
            data: props,
        }).then(response => {
            dispatch({
                type: ActionTypes.FETCH_POST_SUCCESS,

            });
        }).catch(error => {
            if (error.response) {
                dispatch({
                    type: ActionTypes.FETCH_POST_FAILURE,
                    error: error.response.data,
                });
            } else {
                dispatch({
                    type: ActionTypes.FETCH_POST_FAILURE,
                    error: 'null'
                });
            }
            // console.log(error.response.data.message);
        })
    }
}


export function fetchPostSuccess(activePost) {
    return {
        type: FETCH_POST_SUCCESS,
        payload: activePost
    };
}

export function fetchPostFailure(error) {
    return {
        type: FETCH_POST_FAILURE,
        payload: error
    };
}

export function resetActivePost() {
    return {
        type: RESET_ACTIVE_POST
    }
}


export function deletePost(id, tokenFromStorage) {
    const request = axios({
        method: 'delete',
        url: `api/posts/${id}`,
        headers: {
            'Authorization': `Bearer ${tokenFromStorage}`
        }
    });
    return {
        type: DELETE_POST,
        payload: request
    };
}

export function deletePostSuccess(deletedPost) {
    return {
        type: DELETE_POST_SUCCESS,
        payload: deletedPost
    };
}

export function deletePostFailure(response) {
    return {
        type: DELETE_POST_FAILURE,
        payload: response
    };
}