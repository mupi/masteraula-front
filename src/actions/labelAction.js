import { labelService } from 'services';
import { toast } from 'react-toastify';
import {
  addSelectedLabelToQuestionCard, removeSelectedLabelFromQuestionCard,
  addSelectedLabelToActiveQuestion, removeSelectedLabelFromActiveQuestion,
  addSelectedLabelToRelatedQuestion, removeSelectedLabelFromRelatedQuestion,
  removeSelectedLabelFromQuestionCardAfterDeletingLabel,
  removeSelectedLabelFromRelatedQuestionAfterDeletingLabel,
} from './questionAction';
import {
  addSelectedLabelToLearningObject,
  removeSelectedLabelFromLearningObject,
  removeSelectedLabelFromLearningObjectAfterDeletingLabel,
} from './learningObjectAction';

import {
  removeSelectedMyQuestionLabelFilter,
} from './filterAction';

// Load
export const LIST_MY_QUESTION_LABELS = 'LIST_MY_QUESTION_LABELS';
export const LIST_MY_QUESTION_LABELS_SUCCESS = 'LIST_MY_QUESTION_LABELS_SUCCESS';
export const LIST_MY_QUESTION_LABELS_FAILURE = 'LIST_MY_QUESTION_LABELS_FAILURE';

export const CREATE_MY_QUESTION_LABEL = 'CREATE_MY_QUESTION_LABEL';
export const CREATE_MY_QUESTION_LABEL_SUCCESS = 'CREATE_MY_QUESTION_LABEL_SUCCESS';
export const CREATE_MY_QUESTION_LABEL_FAILURE = 'CREATE_MY_QUESTION_LABEL_FAILURE';

export const UPDATE_MY_QUESTION_LABEL = 'UPDATE_MY_QUESTION_LABEL';
export const UPDATE_MY_QUESTION_LABEL_SUCCESS = 'UPDATE_MY_QUESTION_LABEL_SUCCESS';
export const UPDATE_MY_QUESTION_LABEL_FAILURE = 'UPDATE_MY_QUESTION_LABEL_FAILURE';

export const DELETE_MY_QUESTION_LABEL = 'DELETE_MY_QUESTION_LABEL';
export const DELETE_MY_QUESTION_LABEL_SUCCESS = 'DELETE_MY_QUESTION_LABEL_SUCCESS';
export const DELETE_MY_QUESTION_LABEL_FAILURE = 'DELETE_MY_QUESTION_LABEL_FAILURE';

// Add selected label to question
export const ADD_SELECTED_LABEL_TO_QUESTION = 'ADD_SELECTED_LABEL_TO_QUESTION';
export const ADD_SELECTED_LABEL_TO_QUESTION_SUCCESS = 'ADD_SELECTED_LABEL_TO_QUESTION_SUCCESS';
export const ADD_SELECTED_LABEL_TO_QUESTION_FAILURE = 'ADD_SELECTED_LABEL_TO_QUESTION_FAILURE';

// Remove selected label from question
export const REMOVE_SELECTED_LABEL_FROM_QUESTION = 'REMOVE_SELECTED_LABEL_FROM_QUESTION';
export const REMOVE_SELECTED_LABEL_FROM_QUESTION_SUCCESS = 'REMOVE_SELECTED_LABEL_FROM_QUESTION_SUCCESS';
export const REMOVE_SELECTED_LABEL_FROM_QUESTION_FAILURE = 'REMOVE_SELECTED_LABEL_FROM_QUESTION_FAILURE';

export const RELATED_FROM = {
  QUESTION: 1,
  QUESTION_CARD: 2,
  RELATED_QUESTION: 3,
  LEARNING_OBJECT: 4,
};

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


// Function: Update a label
export const updateMyQuestionLabel = (props) => {
  function updateActiveLabel() { return { type: UPDATE_MY_QUESTION_LABEL }; }
  function updateActiveLabelSuccess(activeLabel) { return { type: UPDATE_MY_QUESTION_LABEL_SUCCESS, activeLabel }; }
  function updateActiveLabelFailure(error) { return { type: UPDATE_MY_QUESTION_LABEL_FAILURE, error }; }
  return (dispatch) => {
    dispatch(updateActiveLabel(props));
    return labelService.updateMyQuestionLabel(props).then(
      (activeLabel) => {
        toast.success('Etiqueta atualizada com sucesso', optionsSuccess);
        dispatch(updateActiveLabelSuccess(activeLabel));
      },
      (error) => {
        toast.error('Ocorreu um erro com sua solicitação', optionsError);
        dispatch(updateActiveLabelFailure(error));
      },
    );
  };
};


// delete label
export const deleteMyQuestionLabel = (idLabel) => {
  function deleteSelectedMyQuestionLabel() { return { type: DELETE_MY_QUESTION_LABEL }; }
  function deleteSelectedMyQuestionLabelSuccess(idLabelRemoved) { return { type: DELETE_MY_QUESTION_LABEL_SUCCESS, idLabelRemoved }; }
  function deleteSelectedMyQuestionLabelFailure(error) { return { type: DELETE_MY_QUESTION_LABEL_FAILURE, error }; }
  return (dispatch) => {
    dispatch(deleteSelectedMyQuestionLabel(idLabel));
    return labelService.deleteMyQuestionLabel(idLabel)
      .then(
        (idLabelRemoved) => {
          dispatch(deleteSelectedMyQuestionLabelSuccess(idLabelRemoved));
          dispatch(removeSelectedMyQuestionLabelFilter(idLabelRemoved));
          dispatch(removeSelectedLabelFromQuestionCardAfterDeletingLabel(idLabelRemoved));
          dispatch(removeSelectedLabelFromRelatedQuestionAfterDeletingLabel(idLabelRemoved));
          dispatch(removeSelectedLabelFromActiveQuestion(null, idLabelRemoved));
          dispatch(removeSelectedLabelFromLearningObjectAfterDeletingLabel(idLabelRemoved));
        },
        (error) => {
          dispatch(deleteSelectedMyQuestionLabelFailure(error));
        },
      );
  };
};


// Add Selected Label to Question
export const addSelectedLabelToQuestion = (idQuestion, idLabel, addedFrom) => {
  function addLabelToQuestion() { return { type: ADD_SELECTED_LABEL_TO_QUESTION, idQuestion, idLabel }; }
  function addLabelToQuestionSuccess(addedLabelQuestion) {
    return {
      type: ADD_SELECTED_LABEL_TO_QUESTION_SUCCESS,
      addedLabelQuestion,
    };
  }
  function addLabelToQuestionFailure(error) { return { type: ADD_SELECTED_LABEL_TO_QUESTION_FAILURE, error }; }
  return (dispatch, getState) => {
    if (getState().document.isFetchingAddQuestion) {
      return 1;
    }
    dispatch(addLabelToQuestion());
    return labelService.addSelectedLabelToQuestion(idQuestion, idLabel)
      .then(
        (addedLabelQuestion) => {
          const { label } = addedLabelQuestion;
          switch (addedFrom) {
            case RELATED_FROM.QUESTION_CARD:
              dispatch(addSelectedLabelToQuestionCard(idQuestion, label));
              break;
            case RELATED_FROM.RELATED_QUESTION:
              dispatch(addSelectedLabelToRelatedQuestion(idQuestion, label));
              break;
            case RELATED_FROM.LEARNING_OBJECT:
              dispatch(addSelectedLabelToLearningObject(idQuestion, label));
              break;
            default:
              dispatch(addSelectedLabelToActiveQuestion(idQuestion, label));
              break;
          }

          dispatch(addLabelToQuestionSuccess(addedLabelQuestion));
        },
        (error) => {
          dispatch(addLabelToQuestionFailure(error));
          toast.error(error, optionsError);
        },
      );
  };
};

// Remove Selected Label from Question
export const removeSelectedLabelFromQuestion = (idQuestion, idLabel, addedFrom) => {
  function removeLabelFromQuestion() { return { type: REMOVE_SELECTED_LABEL_FROM_QUESTION, idQuestion, idLabel }; }
  function removeLabelFromQuestionSuccess(removedLabelQuestion) {
    return {
      type: REMOVE_SELECTED_LABEL_FROM_QUESTION_SUCCESS,
      idLabel: removedLabelQuestion.idLabel,
      idQuestion: removedLabelQuestion.idQuestion,
    };
  }
  function removeLabelFromQuestionFailure(error) { return { type: REMOVE_SELECTED_LABEL_FROM_QUESTION_FAILURE, error }; }

  return (dispatch) => {
    dispatch(removeLabelFromQuestion(idQuestion, idLabel));
    return labelService.removeSelectedLabelFromQuestion(idQuestion, idLabel)
      .then(
        (removedLabelQuestion) => {
          switch (addedFrom) {
            case RELATED_FROM.QUESTION_CARD:
              dispatch(removeSelectedLabelFromQuestionCard(idQuestion, idLabel));
              break;
            case RELATED_FROM.RELATED_QUESTION:
              dispatch(removeSelectedLabelFromRelatedQuestion(idQuestion, idLabel));
              break;
            case RELATED_FROM.LEARNING_OBJECT:
              dispatch(removeSelectedLabelFromLearningObject(idQuestion, idLabel));
              break;
            default:
              dispatch(removeSelectedLabelFromActiveQuestion(idQuestion, idLabel));
              break;
          }

          dispatch(removeLabelFromQuestionSuccess(removedLabelQuestion));
        },
        (error) => {
          dispatch(removeLabelFromQuestionFailure(error));
        },
      );
  };
};
