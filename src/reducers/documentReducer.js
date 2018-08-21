import {
  FETCH_DOCUMENT, FETCH_DOCUMENT_SUCCESS, FETCH_DOCUMENT_FAILURE,
  CREATE_DOCUMENT, CREATE_DOCUMENT_SUCCESS, CREATE_DOCUMENT_FAILURE,
  UPDATE_DOCUMENT, UPDATE_DOCUMENT_SUCCESS, UPDATE_DOCUMENT_FAILURE,
  LIST_MY_DOCUMENTS, LIST_MY_DOCUMENTS_SUCCESS, LIST_MY_DOCUMENTS_FAILURE,
  ADD_SELECTED_QUESTION, ADD_SELECTED_QUESTION_SUCCESS, ADD_SELECTED_QUESTION_FAILURE,
  REMOVE_SELECTED_QUESTION, REMOVE_SELECTED_QUESTION_SUCCESS, REMOVE_SELECTED_QUESTION_FAILURE,
  CREATE_DOCUMENT_TOGGLE_MODAL, SWITCH_ACTIVE_DOCUMENT, DELETE_DOCUMENT_SESSION,

} from 'actions/documentAction';

const sessionData = JSON.parse(localStorage.getItem('activeDocument'));
const initialState = sessionData ? {
  activeDocument: sessionData,
  isFetching: false,
} : {
  activeDocument: null,
  isFetching: false,
  isFetchingAddQuestion: false,
};

export const document = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOCUMENT:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        isFetching: true,
        error: null,
      });
    case FETCH_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        activeDocument: action.activeDocument,
        isFetching: false,
      });
    case FETCH_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });

    case CREATE_DOCUMENT:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        activeDocument: action.newDocument,
        isFetching: false,
      });
    case CREATE_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        activeDocument: action.newDocument,
        isFetching: false,
      });
    case CREATE_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });

    case LIST_MY_DOCUMENTS:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        myDocumentsList: null,
        isFetching: true,
        currentPage: action.page,
        error: null,
      });
    case LIST_MY_DOCUMENTS_SUCCESS:
      return Object.assign({}, state, {
        myDocumentsList: action.myDocumentsList,
        isFetching: false,
      });
    case LIST_MY_DOCUMENTS_FAILURE:
      return Object.assign({}, state, {
        myDocumentsList: null,
        isFetching: false,
        error: action.errorMessage,
      });

    case ADD_SELECTED_QUESTION:
      return Object.assign({}, state, {
        isFetchingAddQuestion: true,
        isRemoved: null,
        isUpdated: null,
        error: null,
      });
    case ADD_SELECTED_QUESTION_SUCCESS: {
      const activeDocument = { ...state.activeDocument, questions: [...state.activeDocument.questions, action.addedQuestion] };
      localStorage.setItem('activeDocument', JSON.stringify(activeDocument));
      return Object.assign({}, state, {
        isFetchingAddQuestion: false,
        activeDocument,
      });
    }
    case ADD_SELECTED_QUESTION_FAILURE:
      return Object.assign({}, state, {
        isFetchingAddQuestion: false,
        error: action.error,
      });
    case REMOVE_SELECTED_QUESTION:
      return Object.assign({}, state, {
        isFetchingRemoveQuestion: true,
        isRemoved: null,
        isUpdated: null,
        error: null,
      });
    case REMOVE_SELECTED_QUESTION_SUCCESS: {
      const newQuestionsInDocument = state.activeDocument.questions.filter(item => item.question.id !== action.idRemovedQuestion);
      const activeDocument = { ...state.activeDocument, questions: newQuestionsInDocument };
      localStorage.setItem('activeDocument', JSON.stringify(activeDocument));
      return {
        isFetchingRemoveQuestion: false,
        isRemoved: true,
        activeDocument,
      };
    }
    case REMOVE_SELECTED_QUESTION_FAILURE:
      return Object.assign({}, state, {
        isFetchingRemoveQuestion: false,
        error: action.error,
      });
    case CREATE_DOCUMENT_TOGGLE_MODAL: {
      return Object.assign({}, state, {
        modal: action.modal,
      });
    }
    case UPDATE_DOCUMENT: {
      return Object.assign({}, state, {
        isRemoved: null,
        error: null,
        isUpdated: null,
      });
    }
    case UPDATE_DOCUMENT_SUCCESS: {
      return Object.assign({}, state, {
        activeDocument: { ...action.activeDocument, questions: state.activeDocument.questions },
        isUpdated: true,
      });
    }
    case UPDATE_DOCUMENT_FAILURE: {
      return Object.assign({}, state, {
        error: action.error,
      });
    }
    case SWITCH_ACTIVE_DOCUMENT: {
      return Object.assign({}, state, {
        activeDocument: action.activeDocument,
      });
    }
    case DELETE_DOCUMENT_SESSION: {
      return Object.assign({}, state, {
        activeDocument: null,
      });
    }
    default:
      return state;
  }
};

export default document;
