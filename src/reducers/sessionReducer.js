import { UPDATE_SESSION, DELETE_SESSION, UPDATE_USER } from "actions/sessionAction";

const session_data = JSON.parse(localStorage.getItem('session'));
const initialState = session_data ? { session: session_data } : { session : null }

export function session(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SESSION:
        return Object.assign({}, state, {
            session: action.session
        });
    break;
    case UPDATE_USER:
        return Object.assign({}, state, {
            session : Object.assign({}, state.session, {
                user : action.user
            })
        });
    break;
    case DELETE_SESSION:
        return Object.assign({}, state, {
            session : null
        });
    break;

    default:
    return state;
  }
}

export default session