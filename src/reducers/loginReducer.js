import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_TOGGLE_MODAL } from "actions/loginAction";

let session = JSON.parse(localStorage.getItem('session'));
const initialState = session ? { session: session.user, modal: false } : {}

export function login(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching : true,
                error: null
            });
        break;
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                session: action.session,
                modal: false
            });
        break;
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                session: null
            })
        break;
        case LOGIN_TOGGLE_MODAL:
            return Object.assign({}, state, {
                modal: action.modal
            })
        default:
        return state;
    }
}

export default login