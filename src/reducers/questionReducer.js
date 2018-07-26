import {
  FETCH_QUESTION, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_FAILURE,
  RATE_QUESTION,
  LIST_QUESTION_PAGE, LIST_QUESTION_PAGE_SUCCESS, LIST_QUESTION_PAGE_FAILURE,
} from 'actions/questionAction';

const initialState = {
  activeQuestion: {},
  questionPage: {},
};

export const question = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTION:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
      });
    case FETCH_QUESTION_SUCCESS:
      return Object.assign({}, state, {
        activeQuestion: action.activeQuestion,
        isFetching: false,
      });
    case FETCH_QUESTION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case LIST_QUESTION_PAGE:
      return Object.assign({}, state, {
        currentPage: action.page,
        isFetching: true,
        error: null,
      });
    case LIST_QUESTION_PAGE_SUCCESS:
      return Object.assign({}, state, {
        questionPage: action.questionPage,
        isFetching: false,
      });
    case LIST_QUESTION_PAGE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case RATE_QUESTION:
      return Object.assign({}, state, {
        rating: action.rating,
      });
    default:
      return state;
  }
};

export default question;
