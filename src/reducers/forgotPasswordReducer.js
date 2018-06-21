import { FORGOT_PASSWORD_RESET, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE } from "actions/forgotPasswordAction";

const initialState = {
  success: false,
  isFetching: false,
  error: null
}

export function forgotPassword(state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_RESET:
        return Object.assign({}, state, {
            success: false
        });
    break;
    case FORGOT_PASSWORD_REQUEST:
        return Object.assign({}, state, {
            isFetching : true,
            error: null
        });
    break;
    case FORGOT_PASSWORD_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            success: true
        });
    break;
    case FORGOT_PASSWORD_FAILURE:
        return Object.assign({}, state, {
            isFetching: false,
            error: action.error,
            success : false
        })
    break;
    default:
    return state;
  }
}

export default forgotPassword