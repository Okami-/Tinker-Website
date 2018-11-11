import initialState from '../../store/initialState'
import * as ActionTypes from './types';

const INITIAL_STATE = { 
  postsList: {posts: [], error:null, loading: false},  
  newPost:{post:null, error: null, loading: false}, 
  activePost:{post:null, error:null, loading: false}, 
  deletedPost: {post: null, error:null, loading: false},
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ActionTypes.FETCH_POST:
      return { ...state, activePost:{...state.activePost, loading: true}};
    case ActionTypes.FETCH_POST_SUCCESS:
    return { ...state, activePost: {post: action.payload, error:null, loading: false}};
    case ActionTypes.RESET_ACTIVE_POST:
    return { ...state, activePost: {post: null, error:null, loading: false}};
    case ActionTypes.FETCH_POSTS:
      return { ...state, postsList: {posts:[], error: null, loading: true} }; 
    case ActionTypes.FETCH_POSTS_SUCCESS:// return list of posts and make loading = false
    return { ...state, postsList: {posts: action.payload, error:null, loading: false} };
    case ActionTypes.DELETE_POST:
    return {...state, deletedPost: {...state.deletedPost, loading: true}}
    case ActionTypes.DELETE_POST_SUCCESS:
      return {...state, deletedPost: {post:action.payload, error:null, loading: false}}
    case ActionTypes.DELETE_POST_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return {...state, deletedPost: {post:null, error:error, loading: false}}
    case ActionTypes.RESET_DELETED_POST:
    return {...state,  deletedPost:{post:null, error:null, loading: false}}
  default:
    return state;
  }
}