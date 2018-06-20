import { loginService } from 'services';
import { history } from 'helpers/history';
import { SubmissionError } from 'redux-form'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'
export const LOGIN_TOGGLE_MODAL = 'LOGIN_TOGGLE_MODAL'

export const fetchLogin = (username, password) => {
  return dispatch => {
    dispatch(requestLogin(username))
    return loginService.login(username, password)
      .then(
        session => {
          dispatch(success(session))
          history.push('/home');
        },
        error => {
          dispatch(failure(error))
          throw new SubmissionError({
            _error: 'Usuário e/ou senha inválido(s)'
          })
        }
      )
  }

  function requestLogin(){ return { type: LOGIN_REQUEST } }
  function success(session){ return { type: LOGIN_SUCCESS, session } }
  function failure(error){ return { type: LOGIN_FAILURE, error } }
}

export const logout = () => {
  return dispatch => {
    loginService.logout()
    dispatch(requestLogout())
    history.push('/');
  }

  function requestLogout(){ return { type: LOGOUT } }
}

export const toggleModal = (modal) => {
  return { 
    type: LOGIN_TOGGLE_MODAL, 
    modal : !modal 
  }
}
