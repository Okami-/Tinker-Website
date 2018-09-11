import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './rootReducer'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

export function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools (
      applyMiddleware(
        thunk,
        reduxImmutableStateInvariant()
      )
    )
  )
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(rootReducer)
    )
  }
}