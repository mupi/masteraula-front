import {
  LIST_MY_QUESTION_LABELS,
  LIST_MY_QUESTION_LABELS_SUCCESS, LIST_MY_QUESTION_LABELS_FAILURE,
} from 'actions/labelAction';

const initialState = {
  myQuestionLabels: [],
};

export const label = (state = initialState, action) => {
  switch (action.type) {
    case LIST_MY_QUESTION_LABELS:
      return Object.assign({}, state, {
        myQuestionLabels: action.myQuestionLabels,
        isFetchingMyQuestionLabels: true,
        error: null,
      });
    case LIST_MY_QUESTION_LABELS_SUCCESS:
      return Object.assign({}, state, {
        myQuestionLabels: action.myQuestionLabels,
        isFetchingMyQuestionLabels: false,
      });
    case LIST_MY_QUESTION_LABELS_FAILURE:
      return Object.assign({}, state, {
        isFetchingMyQuestionLabels: false,
        error: action.error,
      });
    default:
      return state;
  }
};

export default label;
