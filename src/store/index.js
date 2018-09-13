import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './rootReducer'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

// Applies logger only in development 
// by creating a middlewares array and adding it into the applyMiddleware paramater
// as ...middlewares
const middlewares = []

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

export function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools (
      applyMiddleware(
        thunk,
        reduxImmutableStateInvariant(),
        ...middlewares,
      )
    )
  )
}