import {
  FETCH_LEARNING_OBJECT, FETCH_LEARNING_OBJECT_SUCCESS, FETCH_LEARNING_OBJECT_FAILURE,
  LIST_LEARNING_OBJECT, LIST_LEARNING_OBJECT_SUCCESS, LIST_LEARNING_OBJECT_FAILURE,
  UPDATE_LEARNING_OBJECT, UPDATE_LEARNING_OBJECT_SUCCESS, UPDATE_LEARNING_OBJECT_FAILURE,
  LIST_LEARNING_OBJECT_MODAL, LIST_LEARNING_OBJECT_MODAL_SUCCESS, LIST_LEARNING_OBJECT_MODAL_FAILURE,
  SET_CURRENT_PAGE_MODAL,
  ADD_SELECTED_LABEL_LEARNING_OBJECT,
  REMOVE_SELECTED_LABEL_LEARNING_OBJECT,
  REMOVE_SELECTED_LABEL_LEARNING_OBJECT_AFTER_DELETING_LABEL,
  CREATE_LEARNING_OBJECT, CREATE_LEARNING_OBJECT_SUCCESS, CREATE_LEARNING_OBJECT_FAILURE,

  DELETE_LEARNING_OBJECT,
  DELETE_LEARNING_OBJECT_SUCCESS,
  DELETE_LEARNING_OBJECT_FAILURE,
} from 'actions/learningObjectAction';
import { toast } from 'react-toastify';

const initialState = {
};

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

const optionsError = {
  className: 'alert__ma-toast--error',
  type: 'error',
};

export const learningObject = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEARNING_OBJECT:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        isFetchingLearningObject: true,
        error: null,
        isDeleted: false,
      });
    case FETCH_LEARNING_OBJECT_SUCCESS:
      localStorage.setItem('activeLearningObject', JSON.stringify(state.activeLearningObject));
      return Object.assign({}, state, {
        activeLearningObject: action.activeLearningObject,
        isFetchingLearningObject: false,
      });
    case FETCH_LEARNING_OBJECT_FAILURE:
      return Object.assign({}, state, {
        isFetchingLearningObject: false,
        error: action.error,
      });
    case UPDATE_LEARNING_OBJECT: {
      return Object.assign({}, state, {
        isRemoved: null,
        error: null,
        isUpdated: null,
      });
    }
    case CREATE_LEARNING_OBJECT:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        activeOnlineTest: action.newOnlineTest,
        isFetching: false,
      });
    case CREATE_LEARNING_OBJECT_SUCCESS:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        activeLearningObject: null,
        isFetching: false,
      });
    case CREATE_LEARNING_OBJECT_FAILURE:
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });

    case UPDATE_LEARNING_OBJECT_SUCCESS: {
      if (action.showMessage) toast.success('Objeto de aprendizagem atualizado com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        activeLearningObject: { ...action.activeLearningObject },
        isUpdated: true,
      });
    }
    case UPDATE_LEARNING_OBJECT_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, { error: action.error });
    }
    case LIST_LEARNING_OBJECT:
      return Object.assign({}, state, {
        currentPage: action.page,
        isFetching: true,
        error: null,
      });
    case LIST_LEARNING_OBJECT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        objectPage: action.objectPage,
      });
    case LIST_LEARNING_OBJECT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case LIST_LEARNING_OBJECT_MODAL:
      return Object.assign({}, state, {
        currentPageModal: action.currentPageModal,
        isFetching: true,
        error: null,
      });
    case LIST_LEARNING_OBJECT_MODAL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        objectPageModal: action.objectPageModal,
      });
    case LIST_LEARNING_OBJECT_MODAL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case SET_CURRENT_PAGE_MODAL:
      return Object.assign({}, state, {
        currentPageModal: action.currentPageModal,
      });
    case ADD_SELECTED_LABEL_LEARNING_OBJECT: {
      const questions = state.activeLearningObject.questions.map((q) => {
        if (q.id === action.idQuestion) {
          return Object.assign({}, q, {
            labels: [...q.labels, action.label],
          });
        }
        return q;
      });

      return Object.assign({}, state, {
        activeLearningObject: {
          ...state.activeLearningObject,
          questions,
        },
      });
    }
    case REMOVE_SELECTED_LABEL_LEARNING_OBJECT: {
      const questions = state.activeLearningObject.questions.map((q) => {
        if (q.id === action.idQuestion) {
          return Object.assign({}, q, {
            labels: [...q.labels.filter(label => label.id !== parseInt(action.idLabel, 10))],
          });
        }
        return q;
      });

      return Object.assign({}, state, {
        activeLearningObject: {
          ...state.activeLearningObject,
          questions,
        },
      });
    }
    case REMOVE_SELECTED_LABEL_LEARNING_OBJECT_AFTER_DELETING_LABEL: {
      if (state.activeLearningObject && state.activeLearningObject.questions) {
        const questions = state.activeLearningObject.questions.map(q => Object.assign({}, q, {
          labels: [...q.labels.filter(label => label.id !== parseInt(action.idLabel, 10))],
        }));

        return Object.assign({}, state, {
          activeLearningObject: {
            ...state.activeLearningObject,
            questions,
          },
        });
      }
      return state;
    }
    case DELETE_LEARNING_OBJECT: {
      return Object.assign({}, state, {
        isDeleting: true,
        isDeleted: false,
      });
    }
    case DELETE_LEARNING_OBJECT_SUCCESS: {
      toast.success('Objeto removido com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        isDeleted: true,
      });
    }
    case DELETE_LEARNING_OBJECT_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        error: action.error,
        isDeleted: false,
      });
    }
    default:
      return state;
  }
};
export default learningObject;
