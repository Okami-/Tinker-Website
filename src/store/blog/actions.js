import * as ActionTypes from './types';
import axios from 'axios';

export function fetchPosts() {
    const request = axios({
        method: 'GET',
        url: '/api/posts'
    });
    return {
        type: ActionTypes.FETCH_POSTS,
        payload: request
    }
}

export function fetchPostsSuccess(posts) {
    return {
        type: ActionTypes.FETCH_POSTS_SUCCESS,
        payload: posts
    };
}

export function fetchPostsFailure(error) {
    return {
        type: ActionTypes.FETCH_POSTS_FAILURE,
        payload: error
    };
}

export function createPost(values) {
    const request = axios({
        method: 'POST',
        data: values,
        url: '/api/posts',
    }).then (() => callback())
    return {
        type: ActionTypes.CREATE_POST,
        payload: request
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

export function fetchPost(id) {
    const request = axios({
        method: 'GET',
        url: `/api/posts/${id}`
    });
    return {
        type: ActionTypes.FETCH_POST,
        payload: request
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