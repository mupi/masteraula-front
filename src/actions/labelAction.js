import { labelService } from 'services';
import { toast } from 'react-toastify';

// Load
export const LIST_MY_QUESTION_LABELS = 'LIST_MY_QUESTION_LABELS';
export const LIST_MY_QUESTION_LABELS_SUCCESS = 'LIST_MY_QUESTION_LABELS_SUCCESS';
export const LIST_MY_QUESTION_LABELS_FAILURE = 'LIST_MY_QUESTION_LABELS_FAILURE';

export const CREATE_MY_QUESTION_LABEL = 'CREATE_MY_QUESTION_LABEL';
export const CREATE_MY_QUESTION_LABEL_SUCCESS = 'CREATE_MY_QUESTION_LABEL_SUCCESS';
export const CREATE_MY_QUESTION_LABEL_FAILURE = 'CREATE_MY_QUESTION_LABEL_FAILURE';

export const UPDATE_MY_QUESTION_LABEL = 'UPDATE_MY_QUESTION_LABEL';
export const DELETE_MY_QUESTION_LABEL = 'DELETE_MY_QUESTION_LABEL';

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

const optionsError = {
  className: 'alert__ma-toast--error',
  type: 'error',
};


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

export const createMyQuestionLabel = (props) => {
  function createNewMyQuestionLabel() { return { type: CREATE_MY_QUESTION_LABEL }; }
  function createMyQuestionLabelSuccess(newMyQuestionLabel) { return { type: CREATE_MY_QUESTION_LABEL_SUCCESS, newMyQuestionLabel }; }
  function createMyQuestionLabelFailure(error) { return { type: CREATE_MY_QUESTION_LABEL_FAILURE, error }; }
  return (dispatch) => {
    dispatch(createNewMyQuestionLabel(props));
    return labelService.createMyQuestionLabel(props).then(
      (newMyQuestionLabel) => {
        dispatch(createMyQuestionLabelSuccess(newMyQuestionLabel));
        toast.success('Etiqueta criada com sucesso', optionsSuccess);
      },
      (error) => {
        toast.error('Ocorreu um erro com sua solicitação', optionsError);
        dispatch(createMyQuestionLabelFailure(error));
      },
    );
  };
};
