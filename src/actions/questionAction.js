import { questionService } from 'services';
import { history } from 'helpers/history';
import { initialize } from 'redux-form';

// Load single question
export const FETCH_QUESTION = 'FETCH_QUESTION';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_FAILURE = 'FETCH_QUESTION_FAILURE';

// Create new question
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS';
export const CREATE_QUESTION_FAILURE = 'CREATE_QUESTION_FAILURE';
export const RESET_NEW_QUESTION = 'RESET_NEW_QUESTION';

// Update question
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const UPDATE_QUESTION_SUCCESS = 'UPDATE_QUESTION_SUCCESS';
export const UPDATE_QUESTION_FAILURE = 'UPDATE_QUESTION_FAILURE';
export const RESET_UPDATE_QUESTION = 'RESET_UPDATE_QUESTION';

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

// Fetch documents that belong to question
export const LIST_DOCUMENTS_AFTER_ADDQUESTION_SUCCESS = 'LIST_DOCUMENTS_AFTER_ADDQUESTION_SUCCESS';
export const LIST_DOCUMENTS_AFTER_REMOVEQUESTION_SUCCESS = 'LIST_DOCUMENTS_AFTER_REMOVEQUESTION_SUCCESS';

export const fetchQuestion = (id) => {
  function requestQuestion() { return { type: FETCH_QUESTION }; }
  function fetchQuestionSuccess(activeQuestion) { return { type: FETCH_QUESTION_SUCCESS, activeQuestion }; }
  function fetchQuestionFailure(error) { return { type: FETCH_QUESTION_FAILURE, error }; }
  return (dispatch) => {
    dispatch(requestQuestion(id));
    return questionService.fetchQuestion(id)
      .then(
        (activeQuestion) => {
          const newLearningObjectList = activeQuestion.learning_objects.map(lobj => ({
            id: lobj.id,
            tags: lobj.tags.map(tag => tag.name.trim()).join(', '),
          }));

          dispatch(initialize('question-edit', {
            difficulty: activeQuestion.difficulty,
            learning_objects: newLearningObjectList,


            tags: activeQuestion.tags.map(tag => tag.name.trim()).join(', '),
          }));
          dispatch(fetchQuestionSuccess(activeQuestion));
        },
        (error) => {
          dispatch(fetchQuestionFailure(error));
          history.push('/question-base/1');
        },
      );
  };
};

// Function: Update an active question
export const updateQuestion = (props) => {
  function updateActiveQuestion() { return { type: UPDATE_QUESTION }; }
  function updateQuestionSuccess(activeQuestion) { return { type: UPDATE_QUESTION_SUCCESS, activeQuestion }; }
  function updateQuestionFailure(error) { return { type: UPDATE_QUESTION_FAILURE, error }; }
  return (dispatch) => {
    dispatch(updateActiveQuestion(props));
    return questionService.updateQuestion(props).then(
      (activeQuestion) => {
        dispatch(updateQuestionSuccess(activeQuestion));
      },
      (error) => {
        dispatch(updateQuestionFailure(error));
      },
    );
  };
};


// listQuestion using filters
export const listQuestions = (page, filter) => {
  function requestQuestionPage() { return { type: LIST_QUESTION_PAGE, page }; }
  function fetchQuestionPageSuccess(questionPage) { return { type: LIST_QUESTION_PAGE_SUCCESS, questionPage }; }
  function fetchQuestionPageFailure(error) { return { type: LIST_QUESTION_PAGE_FAILURE, error }; }
  return (dispatch, getState) => {
    if (getState().question.isFetching) {
      return 1;
    }
    dispatch(requestQuestionPage());
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
};


export const rateQuestion = rating => ({
  type: RATE_QUESTION,
  rating,
});
