import {
  PROFILE_EDIT_REQUEST, PROFILE_EDIT_SUCCESS, PROFILE_EDIT_FAILURE,
  PROFILE_GET_STATES_REQUEST, PROFILE_GET_STATES_SUCCESS, PROFILE_GET_STATES_FAILURE,
  PROFILE_GET_CITIES_REQUEST, PROFILE_GET_CITIES_SUCCESS, PROFILE_GET_CITIES_FAILURE,
} from 'actions/profileEditAction';
import { toast } from 'react-toastify';

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
      const options = {
        className: 'alert__ma-toast--success',
        type: 'success',
      };
      toast.success('Perfil editado com sucesso', options);
      return Object.assign({}, state, {
        isFetching: false,
      });
    }
    case PROFILE_EDIT_FAILURE:
      toast.error('Ocorreu um erro com sua solicitação');
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
