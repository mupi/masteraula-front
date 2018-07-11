import { questionService } from 'services';
import { history } from 'helpers/history';

//Load single question
export const FETCH_QUESTION = 'QUESTION_FETCH'
export const FETCH_QUESTION_SUCCESS = 'QUESTION_FETCH_SUCCESS'
export const FETCH_QUESTION_FAILURE = 'QUESTION_FETCH_FAILURE'

//Create new question
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS';
export const CREATE_QUESTION_FAILURE = 'CREATE_QUESTION_FAILURE';
export const RESET_NEW_QUESTION = 'RESET_NEW_QUESTION';

//Delete question
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS';
export const DELETE_QUESTION_FAILURE = 'DELETE_QUESTION_FAILURE';
export const RESET_DELETE_QUESTION= 'RESET_DELETE_QUESTION';

//Star rating question
export const RATE_QUESTION = 'RATE_QUESTION';


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


export const rateQuestion = (rating) => {
      return {
        type: RATE_QUESTION,
        rating : rating
      }
    }
