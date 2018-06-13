import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/loginAction";

let session = JSON.parse(localStorage.getItem('session'));
const initialState = session ? {user: session.user} : {}

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
                user: action.user
            });
        break;
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                user: null
            })
        default:
        return state;
    }
}

export default login