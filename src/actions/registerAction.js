import { registerService } from 'services';
import { SubmissionError, reset } from 'redux-form';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const VERIFY_EMAIL_RESET = 'VERIFY_EMAIL_RESET';
export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_FAILURE = 'VERIFY_EMAIL_FAILURE';
export const REGISTER_TOGGLE_MODAL = 'REGISTER_TOGGLE_MODAL';
export const RESEND_EMAIL_FAILURE = 'RESEND_EMAIL_FAILURE';
export const RESEND_EMAIL_SUCCESS = 'RESEND_EMAIL_SUCCESS';
export const RESEND_EMAIL_RESET = 'RESEND_EMAIL_RESET';
export const RESEND_EMAIL = 'RESEND_EMAIL';

export const fetchRegister = (email, password, name) => {
  function requestRegister() { return { type: REGISTER_REQUEST }; }
  function success(session) { return { type: REGISTER_SUCCESS, session }; }
  function failure(error) { return { type: REGISTER_FAILURE, error }; }
  return (dispatch) => {
    dispatch(requestRegister(email));
    return registerService.register(email, password, name)
      .then(
        (session) => {
          dispatch(success(session));
          dispatch(reset('register'));
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

export const verifyEmail = (key) => {
  function success(session) { return { type: VERIFY_EMAIL_SUCCESS, session }; }
  function failure(error) { return { type: VERIFY_EMAIL_FAILURE, error }; }
  return dispatch => registerService.verifyEmail(key)
    .then(
      (session) => {
        dispatch(success(session));
      },
      (error) => {
        dispatch(failure(error));
      },
    );
};

export const resendEmail = (email, password) => {
  function resetResend() { return { type: RESEND_EMAIL_RESET }; }
  function resend() { return { type: RESEND_EMAIL }; }
  function success(session) { return { type: RESEND_EMAIL_SUCCESS, session }; }
  function failure(error) { return { type: RESEND_EMAIL_FAILURE, error }; }
  return (dispatch) => {
    dispatch(resetResend(email));
    dispatch(resend(email));
    return registerService.resendEmail(email, password)
      .then(
        (session) => {
          dispatch(success(session));
          dispatch(reset('login'));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
};

export const resetState = () => ({
  type: RESEND_EMAIL_RESET,
});

export const toggleModal = modal => ({
  type: REGISTER_TOGGLE_MODAL,
  modal: !modal,
});
