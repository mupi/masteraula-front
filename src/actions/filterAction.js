import { filterService } from 'services';

//List all filters
export const LIST_FILTER= 'LIST_QUESTION_PAGE'
export const LIST_FILTERS_SUCCESS = 'LIST_QUESTION_PAGE_SUCCESS'
export const LIST_FILTERS_FAILURE = 'LIST_QUESTION_PAGE_FAILURE'


export const listFilters = (filterType, id) => {
  return dispatch => {
    dispatch(requestQuestion(id))
    return questionService.fetchQuestion(id)
      .then(
        activeQuestion => {
          dispatch(fetchQuestionSuccess(activeQuestion))
        },
        error => {
          dispatch(fetchQuestionFailure(error))
        }
      )
  }

  function requestQuestion(){ return { type: FETCH_QUESTION } }
  function fetchQuestionSuccess(activeQuestion){ return { type: FETCH_QUESTION_SUCCESS, activeQuestion } }
  function fetchQuestionFailure(error){ return { type: FETCH_QUESTION_FAILURE, error } }
}
