import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import {
  login, menu, register, forgotPassword, profileEdit, question, filter, session,document
} from 'reducers';

import { history } from 'helpers/history';
import { reducer as formReducer } from 'redux-form';

const loggerMiddleware = createLogger();
/* List of reducers */
const rootReducer = combineReducers({
  login,
  menu,
  register,
  forgotPassword,
  profileEdit,
  question,
  filter,
  session,
  document,
  form: formReducer,
});

export default function configureStore(preloadedState) {
  return createStore(
    connectRouter(history)(rootReducer),
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      routerMiddleware(history),
    ),
  );
}
