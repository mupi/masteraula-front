import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_TOGGLE_MODAL, VERIFY_EMAIL_RESET, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE } from "actions/registerAction";

export function register(state = {}, action) {
    switch (action.type) {
        case REGISTER_REQUEST:
            return Object.assign({}, state, {
                isFetching : true,
                error: null
            });
        break;
        case REGISTER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false
            });
        break;
        case REGISTER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            })
        break;

        case VERIFY_EMAIL_RESET:
            return Object.assign({}, state, {
                success: null,
                error: null
            })
        break;
        case VERIFY_EMAIL_SUCCESS:
            return Object.assign({}, state, {
                success: true,
                error: false
            })
        break;
        case VERIFY_EMAIL_FAILURE:
            return Object.assign({}, state, {
                success: false, 
                error: true
            })
        break;

        case REGISTER_TOGGLE_MODAL:
            return Object.assign({}, state, {
                modal: action.modal
            })
        break;
        default:
        return state;
    }
}

export default register