import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import {
  login, menu, register, forgotPassword, profileEdit, question, filter, session, document, modal,
} from 'reducers';

import { history } from 'helpers/history';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger';

/* List of reducers */
const appReducer = combineReducers({
  login,
  menu,
  register,
  forgotPassword,
  profileEdit,
  question,
  filter,
  session,
  document,
  modal,
  form: formReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'DELETE_SESSION') {
    state = undefined;
  }

  return appReducer(state, action);
};

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger();


  middlewares.push(loggerMiddleware);
}


export default function configureStore(preloadedState) {
  return createStore(
    connectRouter(history)(rootReducer),
    preloadedState,
    applyMiddleware(
      ...middlewares,
      thunkMiddleware,
      routerMiddleware(history),
    ),
  );
}
