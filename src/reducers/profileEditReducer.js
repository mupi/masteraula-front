import {
  PROFILE_EDIT_REQUEST, PROFILE_EDIT_SUCCESS, PROFILE_EDIT_FAILURE,
  PROFILE_PASSWORD_EDIT_REQUEST, PROFILE_PASSWORD_EDIT_SUCCESS, PROFILE_PASSWORD_EDIT_FAILURE
} from "actions/profileEditAction";

let session = JSON.parse(localStorage.getItem('session'));
const initialState = {}

export function profileEdit(state = initialState, action) {
    switch (action.type) {
        case PROFILE_EDIT_REQUEST:
            return Object.assign({}, state, {
                isFetching : true,
                error: null
            });
        break;
        case PROFILE_EDIT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false
            });
        break;
        case PROFILE_EDIT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                session: null
            })
        default:
        return state;
    }
}

export default profileEdit
