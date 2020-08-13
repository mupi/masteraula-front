import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import {
  login, menu, register, forgotPassword, profileEdit, question, filter, filterObject, session,
  document, modal, header, topic, learningObject, suggestion, label, classPlan, dashboard, faq,
  contact, onlineTest, activity, filterActivity, filterClassPlan,
} from 'reducers';

import { gtmMetaReducer, gtmMiddleware } from 'helpers/googletagmanager';

import { history } from 'helpers';
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
  filterObject,
  session,
  document,
  modal,
  header,
  topic,
  learningObject,
  form: formReducer,
  gtmMetaReducer,
  suggestion,
  label,
  classPlan,
  dashboard,
  faq,
  contact,
  onlineTest,
  activity,
  filterActivity,
  filterClassPlan,
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
      gtmMiddleware,
      thunkMiddleware,
      routerMiddleware(history),
    ),
  );
}
