import {
  FETCH_QUESTION, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_FAILURE,
  RATE_QUESTION,
  LIST_QUESTION_PAGE, LIST_QUESTION_PAGE_SUCCESS, LIST_QUESTION_PAGE_FAILURE,
  LIST_DOCUMENTS_AFTER_ADDQUESTION_SUCCESS, LIST_DOCUMENTS_AFTER_REMOVEQUESTION_SUCCESS,
  CLASSIFY_QUESTION,  CLASSIFY_QUESTION_SUCCESS, CLASSIFY_QUESTION_FAILURE,
  UPDATE_QUESTION, UPDATE_QUESTION_SUCCESS, UPDATE_QUESTION_FAILURE,
  CREATE_QUESTION, CREATE_QUESTION_SUCCESS, CREATE_QUESTION_FAILURE,
} from 'actions/questionAction';
import { toast } from 'react-toastify';

const sessionData = JSON.parse(localStorage.getItem('activeDocument'));

const initialState = {
  activeQuestion: { documents: [] },
  questionPage: {},
  activeDocument: sessionData,
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
      const newDocumentList = state.activeQuestion.documents.filter(item => item.id !== activeDocument.id);
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
        isUpdated: null,
      });
    }
    case CLASSIFY_QUESTION_SUCCESS: {
      toast.success('Questão atualizada com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        activeQuestion: { ...action.activeQuestion },
        isUpdated: true,
      });
    }
    case CLASSIFY_QUESTION_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, { error: action.error });
    }
    case CREATE_QUESTION:
      return Object.assign({}, state, {
        error: null,
        isCreating: true,
      });
    case CREATE_QUESTION_SUCCESS: {
      toast.success('Questão criada com sucesso', optionsSuccess);
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
    default:
      return state;
  }
};

export default question;
