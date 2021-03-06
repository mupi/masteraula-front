import {
  FETCH_QUESTION, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_FAILURE,
  RATE_QUESTION,
  LIST_QUESTION_PAGE, LIST_QUESTION_PAGE_SUCCESS, LIST_QUESTION_PAGE_FAILURE,
  LIST_DOCUMENTS_AFTER_ADDQUESTION_SUCCESS, LIST_DOCUMENTS_AFTER_REMOVEQUESTION_SUCCESS,
  CLASSIFY_QUESTION, CLASSIFY_QUESTION_SUCCESS, CLASSIFY_QUESTION_FAILURE,
  UPDATE_QUESTION, UPDATE_QUESTION_SUCCESS, UPDATE_QUESTION_FAILURE,
  CREATE_QUESTION, CREATE_QUESTION_SUCCESS, CREATE_QUESTION_FAILURE,
  ADD_SELECTED_OBJECT_QUESTION, REMOVE_SELECTED_OBJECT_QUESTION,
  RESET_SELECTED_OBJECTLIST_QUESTION,
  SET_OBJECT_TO_NEW_QUESTION,
  ADD_SELECTED_LABEL_QUESTION_CARD, REMOVE_SELECTED_LABEL_QUESTION_CARD,
  ADD_SELECTED_LABEL_ACTIVE_QUESTION, REMOVE_SELECTED_LABEL_ACTIVE_QUESTION,
  ADD_SELECTED_LABEL_RELATED_QUESTION, REMOVE_SELECTED_LABEL_RELATED_QUESTION,
  REMOVE_SELECTED_LABEL_QUESTION_CARD_AFTER_DELETING_LABEL,
  REMOVE_SELECTED_LABEL_RELATED_QUESTION_AFTER_DELETING_LABEL,
  DELETE_QUESTION, DELETE_QUESTION_SUCCESS, DELETE_QUESTION_FAILURE,
  COPY_QUESTION, COPY_QUESTION_SUCCESS, COPY_QUESTION_FAILURE,
  /* Question Modal */
  LIST_QUESTION_MODAL, LIST_QUESTION_MODAL_SUCCESS, LIST_QUESTION_MODAL_FAILURE,
  SET_CURRENT_PAGE_MODAL,
} from 'actions/questionAction';

import { toast } from 'react-toastify';

const sessionData = JSON.parse(localStorage.getItem('activeDocument'));

const initialState = {
  activeQuestion: { documents: [] },
  questionPage: {},
  activeDocument: sessionData,
  selectedObjectList: [],
};

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

const optionsError = {
  className: 'alert__ma-toast--error',
  type: 'error',
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
        selectedObjectList: action.activeQuestion.learning_objects,
        isFetching: false,
      });
    case FETCH_QUESTION_FAILURE:
      return Object.assign({}, state, {
        activeQuestion: null,
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
    case LIST_DOCUMENTS_AFTER_ADDQUESTION_SUCCESS: {
      const activeDocument = JSON.parse(localStorage.getItem('activeDocument'));
      const documentAdded = {
        id: activeDocument.id,
        name: activeDocument.name,
      };
      const activeQuestion = { ...state.activeQuestion, documents: [...state.activeQuestion.documents, documentAdded] };
      localStorage.setItem('activeQuestion', JSON.stringify(activeQuestion));
      return Object.assign({}, state, {
        activeQuestion,
      });
    }
    case LIST_DOCUMENTS_AFTER_REMOVEQUESTION_SUCCESS: {
      const activeDocument = JSON.parse(localStorage.getItem('activeDocument'));
      const newDocumentList = (state.activeQuestion ? state.activeQuestion.documents.filter(item => item.id !== activeDocument.id) : null);
      const activeQuestion = { ...state.activeQuestion, documents: newDocumentList };
      localStorage.setItem('activeQuestion', JSON.stringify(activeQuestion));
      return Object.assign({}, state, {
        activeQuestion,
      });
    }
    case CLASSIFY_QUESTION: {
      return Object.assign({}, state, {
        isRemoved: null,
        error: null,
        isClassified: null,
      });
    }
    case CLASSIFY_QUESTION_SUCCESS: {
      return Object.assign({}, state, {
        activeQuestion: { ...action.activeQuestion },
        isClassified: true,
      });
    }
    case CLASSIFY_QUESTION_FAILURE: {
      return Object.assign({}, state, { error: action.error });
    }
    case UPDATE_QUESTION: {
      return Object.assign({}, state, {
        isRemoved: null,
        error: null,
        isUpdated: null,
      });
    }
    case UPDATE_QUESTION_SUCCESS: {
      return Object.assign({}, state, {
        activeQuestion: { ...action.activeQuestion },
        isUpdated: true,
      });
    }
    case UPDATE_QUESTION_FAILURE: {
      return Object.assign({}, state, { error: action.error });
    }
    case CREATE_QUESTION:
      return Object.assign({}, state, {
        error: null,
        isCreating: true,
      });
    case CREATE_QUESTION_SUCCESS: {
      return Object.assign({}, state, {
        activeQuestion: action.newQuestion,
        isCreating: false,
      });
    }
    case CREATE_QUESTION_FAILURE: {
      return Object.assign({}, state, {
        isCreating: false,
        error: action.error,
      });
    }
    case DELETE_QUESTION: {
      return Object.assign({}, state, {
        isDeleting: true,
        isDeleted: false,
      });
    }
    case DELETE_QUESTION_SUCCESS: {
      let newActive = state.activeQuestion;
      if (state.activeQuestion && state.activeQuestion.id === action.idQuestionRemoved) {
        newActive = null;
        localStorage.setItem('activeQuestion', null);
      }
      return Object.assign({}, state, {
        activeQuestion: newActive,
        isDeleted: true,
      });
    }
    case DELETE_QUESTION_FAILURE: {
      return Object.assign({}, state, {
        error: action.error,
        isDeleted: false,
      });
    }
    case ADD_SELECTED_OBJECT_QUESTION: {
      if (state.selectedObjectList.filter(item => item.id === action.selectedObject.id).length > 0) return state; // do not add duplicates
      return Object.assign({}, state, {
        selectedObjectList: [...state.selectedObjectList, action.selectedObject],
      });
    }
    case REMOVE_SELECTED_OBJECT_QUESTION: {
      const newSelectedObjectList = state.selectedObjectList.filter(item => item.id !== action.idObject);
      return Object.assign({}, state, {
        selectedObjectList: newSelectedObjectList,
      });
    }
    case RESET_SELECTED_OBJECTLIST_QUESTION: {
      const newSelectedObjectList = state.selectedObjectList.filter(item => item.id === state.objectIdAddedToQuestion);
      return Object.assign({}, state, {
        selectedObjectList: newSelectedObjectList,
        objectIdAddedToQuestion: undefined,
      });
    }

    case SET_OBJECT_TO_NEW_QUESTION: {
      return Object.assign({}, state, {
        objectIdAddedToQuestion: action.objectIdAddedToQuestion,
      });
    }

    case ADD_SELECTED_LABEL_QUESTION_CARD: {
      const newQuestionPageResults = state.questionPage.results.map(item => (item.id === action.idQuestion
        ? { ...item, labels: [...item.labels, action.label] }
        : item));

      return Object.assign({}, state, {
        questionPage: {
          ...state.questionPage,
          results: newQuestionPageResults,
        },
      });
    }
    case REMOVE_SELECTED_LABEL_QUESTION_CARD: {
      const newQuestionPageResults = state.questionPage.results.map(item => (item.id === action.idQuestion
        ? { ...item, labels: [...item.labels.filter(label => label.id !== parseInt(action.idLabel, 10))] }
        : item));
      return Object.assign({}, state, {
        questionPage: {
          ...state.questionPage,
          results: newQuestionPageResults,
        },
      });
    }
    case REMOVE_SELECTED_LABEL_QUESTION_CARD_AFTER_DELETING_LABEL: {
      if (state.questionPage && state.questionPage.results) {
        const newQuestionPageResults = state.questionPage.results.map(item => (
          { ...item, labels: [...item.labels.filter(label => label.id !== parseInt(action.idLabel, 10))] }
        ));
        return Object.assign({}, state, {
          questionPage: {
            ...state.questionPage,
            results: newQuestionPageResults,
          },
        });
      }
      return state;
    }

    case ADD_SELECTED_LABEL_ACTIVE_QUESTION: {
      return Object.assign({}, state, {
        activeQuestion: {
          ...state.activeQuestion,
          labels: [...state.activeQuestion.labels, action.label],
        },
      });
    }
    case REMOVE_SELECTED_LABEL_ACTIVE_QUESTION: {
      if (state.activeQuestion && state.activeQuestion.labels) {
        return Object.assign({}, state, {
          activeQuestion: {
            ...state.activeQuestion,
            labels: [...state.activeQuestion.labels.filter(label => label.id !== parseInt(action.idLabel, 10))],
          },
        });
      }
      return state;
    }

    case ADD_SELECTED_LABEL_RELATED_QUESTION: {
      const newRelatedQuestions = state.activeQuestion.related_questions.map((q) => {
        if (q.id === action.idQuestion) {
          return Object.assign({}, q, {
            labels: [...q.labels, action.label],
          });
        }
        return q;
      });

      return Object.assign({}, state, {
        activeQuestion: {
          ...state.activeQuestion,
          related_questions: newRelatedQuestions,
        },
      });
    }
    case REMOVE_SELECTED_LABEL_RELATED_QUESTION: {
      const newRelatedQuestions = state.activeQuestion.related_questions.map((q) => {
        if (q.id === action.idQuestion) {
          return Object.assign({}, q, {
            labels: [...q.labels.filter(label => label.id !== parseInt(action.idLabel, 10))],
          });
        }
        return q;
      });

      return Object.assign({}, state, {
        activeQuestion: {
          ...state.activeQuestion,
          related_questions: newRelatedQuestions,
        },
      });
    }
    case REMOVE_SELECTED_LABEL_RELATED_QUESTION_AFTER_DELETING_LABEL: {
      if (state.activeQuestion && state.activeQuestion.related_questions) {
        const newRelatedQuestions = state.activeQuestion.related_questions.map(q => Object.assign({}, q, {
          labels: [...q.labels.filter(label => label.id !== parseInt(action.idLabel, 10))],
        }));

        return Object.assign({}, state, {
          activeQuestion: {
            ...state.activeQuestion,
            related_questions: newRelatedQuestions,
          },
        });
      }
      return state;
    }
    case LIST_QUESTION_MODAL:
      return Object.assign({}, state, {
        currentPageModal: action.currentPageModal,
        isFetching: true,
        error: null,
      });
    case LIST_QUESTION_MODAL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        questionPageModal: action.questionPageModal,
      });
    case LIST_QUESTION_MODAL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case SET_CURRENT_PAGE_MODAL:
      return Object.assign({}, state, {
        currentPageModal: action.currentPageModal,
      });
    case COPY_QUESTION: {
      toast.success('A cópia da questão está em processo', optionsSuccess);
      return Object.assign({}, state, {
        isRemoved: null,
        error: null,
        isUpdated: null,
        isCopying: true,
      });
    }
    case COPY_QUESTION_SUCCESS: {
      toast.success('Cópia da questão realizada com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        isCopying: false,
        activeClassPlan: { ...action.activeClassPlan },
      });
    }
    case COPY_QUESTION_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        isCopying: false,
        error: action.error,
      });
    }

    default:
      return state;
  }
};

export default question;
