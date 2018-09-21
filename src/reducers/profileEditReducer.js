import {
  PROFILE_EDIT_REQUEST, PROFILE_EDIT_SUCCESS, PROFILE_EDIT_FAILURE,
  PROFILE_GET_STATES_REQUEST, PROFILE_GET_STATES_SUCCESS, PROFILE_GET_STATES_FAILURE,
} from 'actions/profileEditAction';

const initialState = {};

export function profileEdit(state = initialState, action) {
  switch (action.type) {
    case PROFILE_GET_STATES_REQUEST:
      return Object.assign({}, state, {
        stateList: action.stateList,
        isFetchingStatesList: true,
        error: null,
      });
    case PROFILE_GET_STATES_SUCCESS:
      return Object.assign({}, state, {
        stateList: action.stateList,
        isFetchingStatesList: false,
      });
    case PROFILE_GET_STATES_FAILURE:
      return Object.assign({}, state, {
        isFetchingStatesList: false,
        error: action.error,
      });
    case PROFILE_EDIT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      });
    case PROFILE_EDIT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case PROFILE_EDIT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        session: null,
      });
    default:
      return state;
  }
}

export default profileEdit;
