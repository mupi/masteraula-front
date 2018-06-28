import { profileEditService } from 'services';
import { DIFFERENT_OLD_PASSWORD } from 'services/profileEditService';
import { SubmissionError } from 'redux-form'

import { updateUser } from './sessionAction';

export const PROFILE_EDIT_REQUEST = 'PROFILE_EDIT_REQUEST'
export const PROFILE_EDIT_SUCCESS = 'PROFILE_EDIT_SUCCESS'
export const PROFILE_EDIT_FAILURE = 'PROFILE_EDIT_FAILURE'


export const profileEdit = (profile) => {
  return dispatch => {
    dispatch(requestEditProfile(profile))
    return profileEditService.profileEdit(profile)
      .then(
        session => {
          dispatch(success())
          dispatch(updateUser(session))
        },
        error => {
          dispatch(failure(error))
          if (error == DIFFERENT_OLD_PASSWORD){
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

  function requestEditProfile(){ return { type: PROFILE_EDIT_REQUEST } }
  function success(){ return { type: PROFILE_EDIT_SUCCESS } }
  function failure(error){ return { type: PROFILE_EDIT_FAILURE, error } }
}
