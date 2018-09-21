import { combineReducers } from 'redux'
import access from './login/reducer'
import blog from './blog/reducer'

export const rootReducer = combineReducers({
    access,
    blog
})