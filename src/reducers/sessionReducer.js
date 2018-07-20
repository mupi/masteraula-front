import { UPDATE_SESSION, DELETE_SESSION, UPDATE_SESSION_USER } from 'actions/sessionAction';

const session_data = JSON.parse(localStorage.getItem('session'));
const initialState = session_data ? { session: session_data } : { session: null };

export function session(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SESSION:
      return Object.assign({}, state, {
        session: action.session,
      });
    case UPDATE_SESSION_USER:
      return Object.assign({}, state, {
        session: Object.assign({}, state.session, {
          user: action.user,
        }),
      });
    case DELETE_SESSION:
      return Object.assign({}, state, {
        session: null,
      });

    default:
      return state;
  }
}

export default session;
