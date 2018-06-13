import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { combineReducers } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { login } from './reducers/loginReducer'
import { history } from './helpers/history'

const loggerMiddleware = createLogger()

const rootReducer = combineReducers({
    login
})

export default function configureStore(preloadedState) {
  return createStore(
    connectRouter(history)(rootReducer),
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      routerMiddleware(history)
    )
  )
}