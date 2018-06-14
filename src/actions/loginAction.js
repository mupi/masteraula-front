import { loginService } from 'services/loginService';
import { history } from 'helpers/history';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export function fetchLogin(username, password) {
  return dispatch => {
    dispatch(requestLogin(username))
    loginService.login(username, password)
      .then(
        session => {
          dispatch(success(session))
          history.push('/home');
          console.log(history)
        },
        error => {
          dispatch(failure(error))
        }
      )
  }

  function requestLogin(){ return { type: LOGIN_REQUEST } }
  function success(session){ return {type: LOGIN_SUCCESS, session } }
  function failure(error){ return {type: LOGIN_FAILURE, error } }
}
