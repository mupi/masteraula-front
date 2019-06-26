import { loginService } from 'services';
import { SubmissionError, stopSubmit } from 'redux-form';

import { history } from 'helpers/history';
import { updateSession, deleteSession } from 'actions/sessionAction';
import { hideModal } from 'actions/modalAction';
import { deleteDocumentSession } from './documentAction';
import { clearSelectedFilters, clearSearch } from './filterAction';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const LOGIN_TOGGLE_MODAL = 'LOGIN_TOGGLE_MODAL';

const fetchSocialLogin = (method) => {
  const requestLogin = () => ({ type: LOGIN_REQUEST });
  const success = () => ({ type: LOGIN_SUCCESS });
  const failure = error => ({ type: LOGIN_FAILURE, error });

  return (dispatch) => {
    dispatch(requestLogin());

    return method
      .then(
        (session) => {
          dispatch(success());
          dispatch(updateSession(session));
          dispatch(hideModal());
          history.push('/question-base/1');
        },
        (error) => {
          dispatch(stopSubmit('login', {
            _error: error,
          }));
          dispatch(failure(error));
        },
      );
  };
};

export const fetchLogin = (username, password) => {
  const requestLogin = () => ({ type: LOGIN_REQUEST });
  const success = () => ({ type: LOGIN_SUCCESS });
  const failure = error => ({ type: LOGIN_FAILURE, error });

  return (dispatch) => {
    dispatch(requestLogin());

    return loginService.login(username, password)
      .then(
        (session) => {
          dispatch(success());
          dispatch(updateSession(session));
          dispatch(hideModal());
          history.push('/question-base/1');
        },
        (error) => {
          dispatch(failure(error));
          throw new SubmissionError({
            _error: error,
          });
        },
      );
  };
};

export const loginFacebook = (response) => {
  const { accessToken } = response;
  return fetchSocialLogin(loginService.loginFacebook(accessToken));
};

export const loginGoogle = (response) => {
  const { accessToken } = response;
  return fetchSocialLogin(loginService.loginGoogle(accessToken));
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
