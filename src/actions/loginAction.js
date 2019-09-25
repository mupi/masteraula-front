import { loginService } from 'services';
import { SubmissionError, stopSubmit } from 'redux-form';

import { history } from 'helpers';
import { updateSession, deleteSession } from 'actions/sessionAction';
import { hideModal } from 'actions/modalAction';
import { deleteDocumentSession } from './documentAction';
import { clearSelectedFilters, clearSearch } from './filterAction';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const LOGIN_TOGGLE_MODAL = 'LOGIN_TOGGLE_MODAL';
export const REDIRECT_NEXT = 'REDIRECT_NEXT';
export const REDIRECT_RESET = 'REDIRECT_RESET';

export const setRedirect = next => ({
  type: REDIRECT_NEXT,
  next,
});

export const resetRedirect = () => (
  {
    type: REDIRECT_NEXT,
  }
);


const successLogin = (dispatch, getState, session) => {
  const success = () => ({ type: LOGIN_SUCCESS });

  dispatch(success());
  dispatch(updateSession(session));
  dispatch(hideModal());
  if (getState().login.next) {
    history.push(`${getState().login.next}`);
  } else {
    history.push('/question-base/1');
  }
};

const failureLogin = (dispatch, error, social = false) => {
  const failure = () => ({ type: LOGIN_FAILURE, error });

  if (social) {
    dispatch(stopSubmit('login', {
      _error: error,
    }));
  } else {
    dispatch(failure(error));
    throw new SubmissionError({
      _error: error,
    });
  }
  dispatch(failure());
};

const login = (method, social = false) => {
  const requestLogin = () => ({ type: LOGIN_REQUEST });

  return (dispatch, getState) => {
    dispatch(requestLogin());
    return method.then(
      (session) => {
        successLogin(dispatch, getState, session);
      },
      (error) => {
        failureLogin(dispatch, error, social);
      },
    );
  };
};

export const loginFacebook = (response, redirect = null) => {
  const { accessToken } = response;
  return (dispatch) => {
    dispatch(setRedirect(redirect));
    dispatch(login(loginService.loginFacebook(accessToken), true));
  };
};

export const loginGoogle = (response, redirect = null) => {
  const { accessToken } = response;
  return (dispatch) => {
    dispatch(setRedirect(redirect));
    dispatch(login(loginService.loginGoogle(accessToken), true));
  };
};

export const fetchLogin = (username, password, redirect = null) => (dispatch) => {
  dispatch(setRedirect(redirect));
  dispatch(login(loginService.login(username, password)));
};

export const logout = () => (dispatch) => {
  dispatch(deleteSession());
  dispatch(deleteDocumentSession());
  dispatch(clearSelectedFilters());
  dispatch(clearSearch());
  history.push('/');
};

export const toggleModal = (modal) => {
  function requestToggleModal(m) {
    return {
      type: LOGIN_TOGGLE_MODAL,
      modal: !m,
    };
  }

  return (dispatch) => {
    dispatch(deleteSession());
    dispatch(requestToggleModal(modal));
  };
};
