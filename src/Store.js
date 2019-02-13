import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import {
  login, menu, register, forgotPassword, profileEdit, question, filter, session, document, modal, header, topic,
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
  header,
  topic,
  form: formReducer,
});

const middlewares = [];

if (process.env.REACT_APP_ENV === 'dev') {
  const loggerMiddleware = createLogger();


  middlewares.push(loggerMiddleware);
}


export default function configureStore(preloadedState) {
  return createStore(
    connectRouter(history)(appReducer),
    preloadedState,
    applyMiddleware(
      ...middlewares,
      thunkMiddleware,
      routerMiddleware(history),
    ),
  );
}
