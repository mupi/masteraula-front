import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "actions/loginAction";

let session = JSON.parse(localStorage.getItem('session'));
const initialState = session ? { session: session.user} : {}

export function login(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching : true,
                user : action.email,
                error: null
            });
        break;
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                session: action.session
            });
        break;
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                user: null
            })
        break;
        case LOGOUT:
            return Object.assign({}, state, {
                user: null
            })
        default:
        return state;
    }
}

export default login