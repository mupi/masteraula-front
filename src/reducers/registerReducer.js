import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_TOGGLE_MODAL } from "actions/registerAction";

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
                isFetching: false,
                modal: false
            });
        break;
        case REGISTER_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            })
        break;
        case REGISTER_TOGGLE_MODAL:
            return Object.assign({}, state, {
                modal: action.modal
            })
        default:
        return state;
    }
}

export default register