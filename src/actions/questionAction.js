import { questionService } from 'services';

// Load single question
export const FETCH_QUESTION = 'FETCH_QUESTION';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_FAILURE = 'FETCH_QUESTION_FAILURE';

// Create new question
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS';
export const CREATE_QUESTION_FAILURE = 'CREATE_QUESTION_FAILURE';
export const RESET_NEW_QUESTION = 'RESET_NEW_QUESTION';

// Delete question
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS';
export const DELETE_QUESTION_FAILURE = 'DELETE_QUESTION_FAILURE';
export const RESET_DELETE_QUESTION = 'RESET_DELETE_QUESTION';

// Star rating question
export const RATE_QUESTION = 'RATE_QUESTION';

// List questions
export const LIST_QUESTION_PAGE = 'LIST_QUESTION_PAGE';
export const LIST_QUESTION_PAGE_SUCCESS = 'LIST_QUESTION_PAGE_SUCCESS';
export const LIST_QUESTION_PAGE_FAILURE = 'LIST_QUESTION_PAGE_FAILURE';


export const fetchQuestion = (id) => {
  return (dispatch) => {
    dispatch(requestQuestion(id));
    return questionService.fetchQuestion(id)
      .then(
        (activeQuestion) => {
          dispatch(fetchQuestionSuccess(activeQuestion));
        },
        (error) => {
          dispatch(fetchQuestionFailure(error));
        },
      );
  };

  function requestQuestion() { return { type: FETCH_QUESTION }; }
  function fetchQuestionSuccess(activeQuestion) { return { type: FETCH_QUESTION_SUCCESS, activeQuestion }; }
  function fetchQuestionFailure(error) { return { type: FETCH_QUESTION_FAILURE, error }; }
};

// listQuestion using filters
export const listQuestions = (page, filter) => {
  return (dispatch) => {
    dispatch(requestQuestionPage(page));
    return questionService.listQuestions(page, filter)
      .then(
        (questionPage) => {
          dispatch(fetchQuestionPageSuccess(questionPage));
        },
        (error) => {
          dispatch(fetchQuestionPageFailure(error));
        },
      );
  };

  function requestQuestionPage(page) { return { type: LIST_QUESTION_PAGE, page }; }
  function fetchQuestionPageSuccess(questionPage) { return { type: LIST_QUESTION_PAGE_SUCCESS, questionPage }; }
  function fetchQuestionPageFailure(error) { return { type: LIST_QUESTION_PAGE_FAILURE, error }; }
};


export const rateQuestion = rating => ({
  type: RATE_QUESTION,
  rating,
});
