import { registerService } from 'services';
import { SubmissionError, reset } from 'redux-form';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const VERIFY_EMAIL_RESET = 'VERIFY_EMAIL_RESET';
export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_FAILURE = 'VERIFY_EMAIL_FAILURE';
export const REGISTER_TOGGLE_MODAL = 'REGISTER_TOGGLE_MODAL';

export const fetchRegister = (email, password, name) => {
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
            _error: 'Já existe uma conta associada a este usuário',
          });
        },
      );
  };

  function requestRegister() { return { type: REGISTER_REQUEST }; }
  function success(session) { return { type: REGISTER_SUCCESS, session }; }
  function failure(error) { return { type: REGISTER_FAILURE, error }; }
};

export const verifyEmail = (key) => {
  return dispatch => registerService.verifyEmail(key)
    .then(
      (session) => {
        dispatch(success(session));
      },
      (error) => {
        dispatch(failure(error));
      },
    );

  function success(session) { return { type: VERIFY_EMAIL_SUCCESS, session }; }
  function failure(error) { return { type: VERIFY_EMAIL_FAILURE, error }; }
};

export const toggleModal = modal => ({
  type: REGISTER_TOGGLE_MODAL,
  modal: !modal,
});
