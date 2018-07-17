import { profileEditService } from 'services';
import { DIFFERENT_OLD_PASSWORD } from 'services/profileEditService';
import { SubmissionError, clearFields } from 'redux-form'

import { updateSessionUser } from './sessionAction';

export const PROFILE_EDIT_REQUEST = 'PROFILE_EDIT_REQUEST'
export const PROFILE_EDIT_SUCCESS = 'PROFILE_EDIT_SUCCESS'
export const PROFILE_EDIT_FAILURE = 'PROFILE_EDIT_FAILURE'

export const PROFILE_PASSWORD_EDIT_REQUEST = 'PROFILE_PASSWORD_EDIT_REQUEST'
export const PROFILE_PASSWORD_EDIT_SUCCESS = 'PROFILE_PASSWORD_EDIT_SUCCESS'
export const PROFILE_PASSWORD_EDIT_FAILURE = 'PROFILE_PASSWORD_EDIT_FAILURE'

//Edit user's fields
export const profileEdit = (profile) => {
  return dispatch => {
    dispatch(requestEditProfile(profile))
    return profileEditService.profileEdit(profile)
      .then(
        data => {
          let user = data[0]
          
          dispatch(success())
          dispatch(updateSessionUser(user))
        },
        error => {
          dispatch(failure(error))
          throw new SubmissionError({
            _error: 'Não existe conta associada com este email'
          })
        }
      )
  }

  function requestEditProfile(){ return { type: PROFILE_EDIT_REQUEST } }
  function success(){ return { type: PROFILE_EDIT_SUCCESS } }
  function failure(error){ return { type: PROFILE_EDIT_FAILURE, error } }
}

//Redefine password_confirmation
export const redefineUserPassword = (password_data) => {
  return dispatch => {
    dispatch(requestRedefineUserPassword(password_data))
    return profileEditService.profilePasswordEdit(password_data)
      .then(
        data => {
          let session = data[0]

          dispatch(success())
          dispatch(clearFields('profile_password', true, true, 'new_password', 'old_password', 'password_confirmation'))
        },
        error => {
          dispatch(failure(error))
          if (error === DIFFERENT_OLD_PASSWORD){
            throw new SubmissionError({
              old_password: 'Senha antiga não confere',
              _error: 'Senha antiga não confere'
            })
          }
          throw new SubmissionError({
            _error: 'Não existe conta associada com este email'
          })
        }
      )
  }

  function requestRedefineUserPassword(){ return { type: PROFILE_EDIT_REQUEST } }
  function success(){ return { type: PROFILE_EDIT_SUCCESS } }
  function failure(error){ return { type: PROFILE_EDIT_FAILURE, error } }
}
