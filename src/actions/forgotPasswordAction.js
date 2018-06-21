import { forgotPasswordService } from 'services/forgotPasswordService';
import { SubmissionError } from 'redux-form'

export const FORGOT_PASSWORD_RESET = 'FORGOT_PASSWORD_OPEN'
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE'

export const resetForgotPasswordForm = () => ({
  type : FORGOT_PASSWORD_RESET
})

export const sendForgotPasswordEmail = (email) => {
  return dispatch => {
    dispatch(requestForgotPassword(email))
    return forgotPasswordService.sendForgotPasswordEmail(email)
      .then(
        () => {
          dispatch(success())
        },
        error => {
          dispatch(failure(error))
          throw new SubmissionError({
            _error: 'Não existe conta associada com este email'
          })
        }
      )
  }

  function requestForgotPassword(){ return { type: FORGOT_PASSWORD_REQUEST } }
  function success(){ return { type: FORGOT_PASSWORD_SUCCESS } }
  function failure(error){ return { type: FORGOT_PASSWORD_FAILURE, error } }
}