import { labelService } from 'services';

// Load
export const LIST_MY_QUESTION_LABELS = 'LIST_MY_QUESTION_LABELS';
export const LIST_MY_QUESTION_LABELS_SUCCESS = 'LIST_MY_QUESTION_LABELS_SUCCESS';
export const LIST_MY_QUESTION_LABELS_FAILURE = 'LIST_MY_QUESTION_LABELS_FAILURE';

// List all my question labels
export const listMyQuestionLabels = (param) => {
  function requestListMyQuestionLabels() { return { type: LIST_MY_QUESTION_LABELS }; }
  function fetchListMyQuestionLabelsSuccess(myQuestionLabels) {
    return { type: LIST_MY_QUESTION_LABELS_SUCCESS, myQuestionLabels };
  }
  function fetchListMyQuestionLabelsFailure(error) {
    return { type: LIST_MY_QUESTION_LABELS_FAILURE, error };
  }
  return (dispatch) => {
    dispatch(requestListMyQuestionLabels(param));
    return labelService.listMyQuestionLabels(param)
      .then(
        (myQuestionLabels) => {
          dispatch(fetchListMyQuestionLabelsSuccess(myQuestionLabels));
        },
        (error) => {
          dispatch(fetchListMyQuestionLabelsFailure(error));
        },
      );
  };
};
