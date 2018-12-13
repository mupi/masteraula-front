import { profileEditService } from 'services';
import { DIFFERENT_OLD_PASSWORD } from 'services/profileEditService';
import { SubmissionError, change, reset } from 'redux-form';

import { updateSessionUser } from './sessionAction';

// Get states list in UserProfile
export const PROFILE_GET_STATES_REQUEST = 'PROFILE_GET_STATES_REQUEST';
export const PROFILE_GET_STATES_SUCCESS = 'PROFILE_GET_STATES_SUCCESS';
export const PROFILE_GET_STATES_FAILURE = 'PROFILE_GET_STATES_FAILURE';

// Get cities of the chosen state
export const PROFILE_GET_CITIES_REQUEST = 'PROFILE_GET_CITIES_REQUEST';
export const PROFILE_GET_CITIES_SUCCESS = 'PROFILE_GET_CITIES_SUCCESS';
export const PROFILE_GET_CITIES_FAILURE = 'PROFILE_GET_CITIES_FAILURE';

export const PROFILE_EDIT_REQUEST = 'PROFILE_EDIT_REQUEST';
export const PROFILE_EDIT_SUCCESS = 'PROFILE_EDIT_SUCCESS';
export const PROFILE_EDIT_FAILURE = 'PROFILE_EDIT_FAILURE';

export const PROFILE_PASSWORD_EDIT_REQUEST = 'PROFILE_PASSWORD_EDIT_REQUEST';
export const PROFILE_PASSWORD_EDIT_SUCCESS = 'PROFILE_PASSWORD_EDIT_SUCCESS';
export const PROFILE_PASSWORD_EDIT_FAILURE = 'PROFILE_PASSWORD_EDIT_FAILURE';

// State List
export const getStatesList = (param) => {
  function fetchStatesList() { return { type: PROFILE_GET_STATES_REQUEST }; }
  function fetchStatesListSuccess(stateList) {
    return { type: PROFILE_GET_STATES_SUCCESS, stateList };
  }
  function fetchStatesListFailure(error) {
    return { type: PROFILE_GET_STATES_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(fetchStatesList(param));
    return profileEditService.getStatesList(param)
      .then(
        (stateList) => {
          dispatch(fetchStatesListSuccess(stateList));
        },
        (error) => {
          dispatch(fetchStatesListFailure(error));
        },
      );
  };
};

// State cities of a state id
export const getCitiesList = (idState, autoLoad) => {
  function fetchCitiesList() { return { type: PROFILE_GET_CITIES_REQUEST }; }
  function fetchCitiesListSuccess(cityList) {
    return { type: PROFILE_GET_CITIES_SUCCESS, cityList };
  }
  function fetchCitiesListFailure(error) {
    return { type: PROFILE_GET_CITIES_FAILURE, error };
  }
  return (dispatch) => {
    if (!autoLoad) {
      dispatch(change('profile', 'userCity', '0'));
    }
    dispatch(fetchCitiesList(idState));
    return profileEditService.getCitiesList(idState)
      .then(
        (cityList) => {
          dispatch(fetchCitiesListSuccess(cityList));
        },
        (error) => {
          dispatch(fetchCitiesListFailure(error));
        },
      );
  };
};

// Edit user's fields
export const profileEdit = (profile) => {
  function requestEditProfile() { return { type: PROFILE_EDIT_REQUEST }; }
  function success() { return { type: PROFILE_EDIT_SUCCESS }; }
  function failure(error) { return { type: PROFILE_EDIT_FAILURE, error }; }

  return (dispatch) => {
    dispatch(requestEditProfile(profile));
    return profileEditService.profileEdit(profile)
      .then(
        (data) => {
          const user = data[0];

          dispatch(success());
          dispatch(updateSessionUser(user));
        },
        (error) => {
          dispatch(failure(error));
          throw new SubmissionError({
            _error: 'Não existe conta associada com este email',
          });
        },
      );
  };
};

// Redefine password_confirmation
export const redefineUserPassword = (passwordData) => {
  function requestRedefineUserPassword() { return { type: PROFILE_PASSWORD_EDIT_REQUEST }; }
  function success() { return { type: PROFILE_PASSWORD_EDIT_SUCCESS }; }
  function failure(error) { return { type: PROFILE_PASSWORD_EDIT_FAILURE, error }; }

  return (dispatch) => {
    dispatch(requestRedefineUserPassword(passwordData));
    return profileEditService.profilePasswordEdit(passwordData)
      .then(
        () => {
          dispatch(success());
          // dispatch(clearFields('profile_password', true, true, 'new_password', 'old_password', 'password_confirmation'));
          dispatch(reset('profile_password'));
        },
        (error) => {
          dispatch(failure(error));
          if (error === DIFFERENT_OLD_PASSWORD) {
            throw new SubmissionError({
              old_password: 'Senha antiga não confere',
              _error: 'Senha antiga não confere',
            });
          }
          throw new SubmissionError({
            _error: 'Não existe conta associada com este email',
          });
        },
      );
  };
};
