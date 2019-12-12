import {
  LIST_MY_QUESTION_LABELS,
  LIST_MY_QUESTION_LABELS_SUCCESS, LIST_MY_QUESTION_LABELS_FAILURE,

  CREATE_MY_QUESTION_LABEL,
  CREATE_MY_QUESTION_LABEL_SUCCESS,
  CREATE_MY_QUESTION_LABEL_FAILURE,

  UPDATE_MY_QUESTION_LABEL,
  UPDATE_MY_QUESTION_LABEL_SUCCESS,
  UPDATE_MY_QUESTION_LABEL_FAILURE,

  DELETE_MY_QUESTION_LABEL,
  DELETE_MY_QUESTION_LABEL_SUCCESS,
  DELETE_MY_QUESTION_LABEL_FAILURE,

} from 'actions/labelAction';
import { toast } from 'react-toastify';

const initialState = {
  myQuestionLabels: [],
};

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

const optionsError = {
  className: 'alert__ma-toast--error',
  type: 'error',
};

export const label = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MY_QUESTION_LABEL:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        isCreated: false,
      });
    case CREATE_MY_QUESTION_LABEL_SUCCESS:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        myQuestionLabels: [...state.myQuestionLabels, action.newMyQuestionLabel],
        isCreated: true,
      });
    case CREATE_MY_QUESTION_LABEL_FAILURE:
      return Object.assign({}, state, {
        isCreated: false,
        error: action.error,
      });
    case UPDATE_MY_QUESTION_LABEL: {
      return Object.assign({}, state, {
        isRemoved: null,
        error: null,
        isUpdated: null,
      });
    }
    case UPDATE_MY_QUESTION_LABEL_SUCCESS: {
      return Object.assign({}, state, {
        activeLabel: { ...action.activeLabel },
        isUpdated: true,
      });
    }
    case UPDATE_MY_QUESTION_LABEL_FAILURE: {
      return Object.assign({}, state, { error: action.error });
    }
    case DELETE_MY_QUESTION_LABEL: {
      return Object.assign({}, state, {
        isDeleting: true,
        isDeleted: false,
      });
    }
    case DELETE_MY_QUESTION_LABEL_SUCCESS: {
      toast.success('Etiqueta removida com sucesso', optionsSuccess);
      const newMyQuestionLabels = state.myQuestionLabels.filter(item => item.id !== action.idLabelRemoved);

      return Object.assign({}, state, {
        myQuestionLabels: newMyQuestionLabels,
        isDeleted: true,
      });
    }
    case DELETE_MY_QUESTION_LABEL_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        error: action.error,
        isDeleted: false,
      });
    }
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
