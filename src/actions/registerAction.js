import { registerService } from 'services';
import { history } from 'helpers/history';
import { SubmissionError, reset } from 'redux-form'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const REGISTER_TOGGLE_MODAL = 'REGISTER_TOGGLE_MODAL'

export const fetchRegister = (email, password, name) => {
  return dispatch => {
    dispatch(requestRegister(email))
    return registerService.register(email, password, name)
      .then(
        session => {
          dispatch(success(session))
          dispatch(reset('register'))
        },
        error => {
          dispatch(failure(error))
          throw new SubmissionError({
            _error: 'Já existe uma conta associada a este usuário'
          })
        }
      )
  }

  function requestRegister(){ return { type: REGISTER_REQUEST } }
  function success(session){ return { type: REGISTER_SUCCESS, session } }
  function failure(error){ return { type: REGISTER_FAILURE, error } }
}

export const toggleModal = (modal) => {
  return { 
    type: REGISTER_TOGGLE_MODAL, 
    modal : !modal 
  }
}
