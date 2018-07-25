//import { filterService } from 'services';

//Create new filter
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS';
export const CREATE_QUESTION_FAILURE = 'CREATE_QUESTION_FAILURE';
export const RESET_NEW_QUESTION = 'RESET_NEW_QUESTION';

//Delete filter
export const DELETE_FILTER = 'DELETE_QUESTION';
export const DELETE_FILTER_SUCCESS = 'DELETE_QUESTION_SUCCESS';
export const DELETE_FILTER_FAILURE = 'DELETE_QUESTION_FAILURE';
export const RESET_DELETE_FILTER= 'RESET_DELETE_QUESTION';

//List all filters
export const LIST_FILTER= 'LIST_QUESTION_PAGE'
export const LIST_FILTERS_SUCCESS = 'LIST_QUESTION_PAGE_SUCCESS'
export const LIST_FILTERS_FAILURE = 'LIST_QUESTION_PAGE_FAILURE'


export const fetchQuestion = (id) => {
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

export const listQuestions = (page) => {
  return dispatch => {
    dispatch(requestQuestionPage(page))
    return questionService.listQuestions(page)
      .then(
        questionPage => {
          dispatch(fetchQuestionPageSuccess(questionPage))
        },
        error => {
          dispatch(fetchQuestionPageFailure(error))
        }
      )
  }

  function requestQuestionPage(page){ return { type: LIST_QUESTION_PAGE, page } }
  function fetchQuestionPageSuccess(questionPage){ return { type: LIST_QUESTION_PAGE_SUCCESS, questionPage } }
  function fetchQuestionPageFailure(error){ return { type: LIST_QUESTION_PAGE_FAILURE, error } }
}
