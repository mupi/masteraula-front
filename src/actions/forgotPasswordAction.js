import { forgotPasswordService } from 'services/forgotPasswordService';
import { SubmissionError, clearFields, reset } from 'redux-form';

export const FORGOT_PASSWORD_RESET = 'FORGOT_PASSWORD_OPEN';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const CHANGE_PASSWORD_RESET = 'CHANGE_PASSWORD_RESET';
export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

export const resetForgotPasswordForm = () => ({
  type: FORGOT_PASSWORD_RESET,
});

export const sendForgotPasswordEmail = (email) => {
  return (dispatch) => {
    dispatch(requestForgotPassword());
    return forgotPasswordService.sendForgotPasswordEmail(email)
      .then(
        () => {
          dispatch(success());
        },
        (error) => {
          dispatch(failure(error));
          throw new SubmissionError({
            _error: 'Não existe conta associada com este email',
          });
        },
      );
  };

  function requestForgotPassword() { return { type: FORGOT_PASSWORD_REQUEST }; }
  function success() { return { type: FORGOT_PASSWORD_SUCCESS }; }
  function failure(error) { return { type: FORGOT_PASSWORD_FAILURE, error }; }
};

export const resetChangePasswordForm = () => ({
  type: CHANGE_PASSWORD_RESET,
});

export const resetForgotPassword = (password, confirmation, uid, token) => {
  return (dispatch) => {
    dispatch(requestResetForgotPassword());
    return forgotPasswordService.resetForgotPassword(password, confirmation, uid, token)
      .then(
        () => {
          dispatch(success()),
         // dispatch(clearFields('redefine_password', true, true, 'repeatpassword', 'newpassword'));
         dispatch(reset('redefine_password'));

        },
        (error) => {
          dispatch(failure(error));
          throw new SubmissionError({
            _error: 'Endereço para troca de e-mail inválido',
          });
        },
      );
  };

  function requestResetForgotPassword() { return { type: CHANGE_PASSWORD_REQUEST }; }
  function success() { return { type: CHANGE_PASSWORD_SUCCESS }; }
  function failure(error) { return { type: CHANGE_PASSWORD_FAILURE, error }; }
};
