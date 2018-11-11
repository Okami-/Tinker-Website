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
    case ActionTypes.FETCH_POSTS:
      return { ...state, postsList: {posts:[], error: null, loading: true} }; 
    case ActionTypes.FETCH_POSTS_SUCCESS:// return list of posts and make loading = false
    return { ...state, postsList: {posts: action.payload, error:null, loading: false} };
    case ActionTypes.DELETE_POST:
      // Comment 3
      return _.omit(state, action.payload);
  default:
    return state;
  }
}