import {
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_TOGGLE_MODAL, VERIFY_EMAIL_RESET, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE,
  RESEND_EMAIL_FAILURE, RESEND_EMAIL_RESET, RESEND_EMAIL_SUCCESS, RESEND_EMAIL,
} from 'actions/registerAction';

export function register(state = {}, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      });
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case VERIFY_EMAIL_RESET:
      return Object.assign({}, state, {
        verifySuccess: null,
        error: null,
      });
    case VERIFY_EMAIL_SUCCESS:
      return Object.assign({}, state, {
        verifySuccess: true,
        error: false,
      });
    case VERIFY_EMAIL_FAILURE:
      return Object.assign({}, state, {
        verifySuccess: false,
        error: true,
      });
    case REGISTER_TOGGLE_MODAL:
      return Object.assign({}, state, {
        modal: action.modal,
      });
    case RESEND_EMAIL_RESET:
      return Object.assign({}, state, {
        success: null,
        error: null,
        isSending: false,
      });
    case RESEND_EMAIL:
      return Object.assign({}, state, {
        isSending: true,
      });
    case RESEND_EMAIL_SUCCESS:
      return Object.assign({}, state, {
        success: true,
        error: false,
        isSending: false,
      });
    case RESEND_EMAIL_FAILURE:
      return Object.assign({}, state, {
        success: false,
        error: true,
        isSending: false,
      });
    default:
      return state;
  }
}

export default register;
