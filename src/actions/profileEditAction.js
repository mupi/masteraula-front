import { profileEditService } from 'services';
import { SubmissionError } from 'redux-form'

export const PROFILE_EDIT_REQUEST = 'PROFILE_EDIT_REQUEST'
export const PROFILE_EDIT_SUCCESS = 'PROFILE_EDIT_SUCCESS'
export const PROFILE_EDIT_FAILURE = 'PROFILE_EDIT_FAILURE'


export const profileEdit = (profile) => {
  return dispatch => {
    dispatch(requestEditProfile(profile))
    return profileEditService.profileEdit(profile)
      .then(
        () => {
          dispatch(success())
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
