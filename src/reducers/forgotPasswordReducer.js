import {
  FORGOT_PASSWORD_RESET, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_RESET,
} from 'actions/forgotPasswordAction';
import { toast } from 'react-toastify';

const initialState = {
  success: false,
  isFetching: false,
  error: null,
};

export function forgotPassword(state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_RESET:
      return Object.assign({}, state, {
        success: false,
      });
    case FORGOT_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      });
    case FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        success: true,
      });
    case FORGOT_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        success: false,
      });
    case CHANGE_PASSWORD_RESET:
      return Object.assign({}, state, {
        success: false,
      });
    case CHANGE_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      });
    case CHANGE_PASSWORD_SUCCESS: {
      const options = {
        className: 'alert__ma-toast--success',
        type: 'success',
      };
      toast.success('Senha alterada com sucesso', options);
      return Object.assign({}, state, {
        isFetching: false,
        success: true,
      });
    }
    case CHANGE_PASSWORD_FAILURE:
      toast.error('Ocorreu um erro com sua solicitação');
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        success: false,
      });
    default:
      return state;
  }
}

export default forgotPassword;
