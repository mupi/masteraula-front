import { loginService } from 'services';
import { SubmissionError } from 'redux-form';

import { history } from 'helpers/history';
import { updateSession, deleteSession } from 'actions/sessionAction';
import { deleteDocumentSession } from './documentAction';
import { clearSelectedFilters, clearSearch } from './filterAction';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const LOGIN_TOGGLE_MODAL = 'LOGIN_TOGGLE_MODAL';

export const fetchLogin = (username, password) => {
  function requestLogin() { return { type: LOGIN_REQUEST }; }
  function success() { return { type: LOGIN_SUCCESS }; }
  function failure(error) { return { type: LOGIN_FAILURE, error }; }

  return (dispatch) => {
    dispatch(requestLogin(username));
    return loginService.login(username, password)
      .then(
        (session) => {
          dispatch(success());
          dispatch(updateSession(session));
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

export const logout = () => (dispatch) => {
  dispatch(deleteSession());
  dispatch(deleteDocumentSession());
  dispatch(clearSelectedFilters());
  dispatch(clearSearch());
  history.push('/');
};

export const toggleModal = (modal) => {
  function requestToggleModal(modal) {
    return {
      type: LOGIN_TOGGLE_MODAL,
      modal: !modal,
    };
  }

  return (dispatch) => {
    dispatch(deleteSession());
    dispatch(requestToggleModal(modal));
  };
};