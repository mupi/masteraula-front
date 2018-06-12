import { loginService } from '../services/loginService';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export function fetchLogin(username, password) {
  // console.log(login)
  return dispatch => {
    dispatch(requestLogin(username))
    loginService.login(username, password)
      .then(
        session => dispatch(success(session)),
        error => dispatch(failure(error))
      )
  }

  function requestLogin(){ return { type: LOGIN_REQUEST } }
  function success(session){ return {type: LOGIN_SUCCESS, session } }
  function failure(error){ return {type: LOGIN_FAILURE, error } }
}
