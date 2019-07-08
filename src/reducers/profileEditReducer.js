import {
  PROFILE_EDIT_REQUEST, PROFILE_EDIT_SUCCESS, PROFILE_EDIT_FAILURE,
  PROFILE_PASSWORD_EDIT_REQUEST, PROFILE_PASSWORD_EDIT_SUCCESS, PROFILE_PASSWORD_EDIT_FAILURE,
  PROFILE_GET_STATES_REQUEST, PROFILE_GET_STATES_SUCCESS, PROFILE_GET_STATES_FAILURE,
  PROFILE_GET_CITIES_REQUEST, PROFILE_GET_CITIES_SUCCESS, PROFILE_GET_CITIES_FAILURE,
  PROFILE_DISCONNECT_REQUEST, PROFILE_DISCONNECT_SUCCESS, PROFILE_DISCONNECT_FAILURE,

} from 'actions/profileEditAction';
import { toast } from 'react-toastify';
import { PROFILE_CONNECT_REQUEST, PROFILE_CONNECT_SUCCESS, PROFILE_CONNECT_FAILURE } from '../actions/profileEditAction';

const initialState = {};
const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

const optionsError = {
  className: 'alert__ma-toast--error',
  type: 'error',
};

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
    case PROFILE_GET_CITIES_REQUEST:
      return Object.assign({}, state, {
        cityList: action.cityList,
        isFetchingCitiesList: true,
        error: null,
      });
    case PROFILE_GET_CITIES_SUCCESS:
      return Object.assign({}, state, {
        cityList: action.cityList,
        isFetchingCitiesList: false,
      });
    case PROFILE_GET_CITIES_FAILURE:
      return Object.assign({}, state, {
        isFetchingCitiesList: false,
        error: action.error,
      });
    case PROFILE_EDIT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      });
    case PROFILE_EDIT_SUCCESS: {
      toast.success('Perfil editado com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        isFetching: false,
      });
    }
    case PROFILE_EDIT_FAILURE:
      // toast.error(`${action.error}`.split(':')[1], optionsError);
      toast.error(action.error, optionsError);
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        session: null,
      });
    case PROFILE_PASSWORD_EDIT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      });
    case PROFILE_PASSWORD_EDIT_SUCCESS: {
      toast.success('Sua senha foi alterada com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        isFetching: false,
      });
    }
    case PROFILE_PASSWORD_EDIT_FAILURE:
      toast.error(action.error, optionsError);
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        session: null,
      });
    case PROFILE_CONNECT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      });
    case PROFILE_CONNECT_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
      });
    }
    case PROFILE_CONNECT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        session: null,
      });
    case PROFILE_DISCONNECT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        idSocialAccount: state.idSocialAccount,
      });
    case PROFILE_DISCONNECT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case PROFILE_DISCONNECT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    default:
      return state;
  }
}

export default profileEdit;
