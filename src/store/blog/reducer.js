import initialState from '../../store/initialState'
import * as ActionTypes from './types';

const INITIAL_STATE = {
    postsList: { posts: [], error: null, loading: false },
    newPost: { post: null, error: null, loading: false },
    activePost: { post: null, error: null, loading: false },
    deletedPost: { post: null, error: null, loading: false },
};

export default function (state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case ActionTypes.BLOG_LOADING: {
            return {
                ...state,
                loading: action.isLoading
            };
        }
        case ActionTypes.LOAD_BLOG_SUCCESS: {
            return {
                ...state,
                posts: action.posts,
                loading: false,
            };
        }
        case ActionTypes.FETCH_POSTS: {
            return {
                ...state,
                postsList: {
                    posts: [],
                    error: null,
                    loading: true,
                }
            }
        }
        case ActionTypes.FETCH_POSTS_SUCCESS: {
            return {
                ...state,
                postsList: {
                    posts: action.payload,
                    error: null,
                    loading: false,
                }
            }
        }
        case ActionTypes.FETCH_POSTS_FAILURE: {
            error = action.payload || { message: action.payload.message };
            return {
                ...state,
                postsList: {
                    posts: [],
                    error: error,
                    loading: false,
                }
            }
        }
        default:
            return state;
    }
}
