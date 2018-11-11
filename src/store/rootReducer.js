import { combineReducers } from 'redux'
import access from './login/reducer'
import PostsReducer from './blog/reducer'
import { reducer as formReducer } from 'redux-form';

export const rootReducer = combineReducers({
    access,
    posts: PostsReducer,
    form: formReducer
})