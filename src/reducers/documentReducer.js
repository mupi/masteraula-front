import {
  FETCH_DOCUMENT, FETCH_DOCUMENT_SUCCESS, FETCH_DOCUMENT_FAILURE,
  FETCH_PREVIEW_DOCUMENT, FETCH_PREVIEW_DOCUMENT_SUCCESS, FETCH_PREVIEW_DOCUMENT_FAILURE,
  CREATE_DOCUMENT, CREATE_DOCUMENT_SUCCESS, CREATE_DOCUMENT_FAILURE,
  UPDATE_DOCUMENT, UPDATE_DOCUMENT_SUCCESS, UPDATE_DOCUMENT_FAILURE,
  LIST_MY_DOCUMENTS, LIST_MY_DOCUMENTS_SUCCESS, LIST_MY_DOCUMENTS_FAILURE,
  LIST_MY_LAST_DOCUMENTS, LIST_MY_LAST_DOCUMENTS_SUCCESS, LIST_MY_LAST_DOCUMENTS_FAILURE,
  ADD_SELECTED_QUESTION, ADD_SELECTED_QUESTION_SUCCESS, ADD_SELECTED_QUESTION_FAILURE,
  REMOVE_SELECTED_QUESTION, REMOVE_SELECTED_QUESTION_SUCCESS, REMOVE_SELECTED_QUESTION_FAILURE,
  CREATE_DOCUMENT_TOGGLE_MODAL, SWITCH_ACTIVE_DOCUMENT, DELETE_DOCUMENT_SESSION,
  DELETE_DOCUMENT, DELETE_DOCUMENT_SUCCESS, DELETE_DOCUMENT_FAILURE,
  DOWNLOAD_DOCUMENT, DOWNLOAD_DOCUMENT_SUCCESS, DOWNLOAD_DOCUMENT_FAILURE,

} from 'actions/documentAction';
import { toast } from 'react-toastify';

const sessionData = JSON.parse(localStorage.getItem('activeDocument'));
const initialState = sessionData ? {
  activeDocument: sessionData,
  isFetching: false,
} : {
  activeDocument: null,
  isFetching: false,
  isFetchingAddQuestion: false,
};

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

const optionsError = {
  className: 'alert__ma-toast--error',
  type: 'error',
};

export const document = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOCUMENT:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        isFetching: true,
        error: null,
        isDeleted: false,
      });
    case FETCH_DOCUMENT_SUCCESS:
      localStorage.setItem('activeDocument', JSON.stringify(state.activeDocument));
      return Object.assign({}, state, {
        activeDocument: action.activeDocument,
        isFetching: false,
      });
    case FETCH_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });

    case FETCH_PREVIEW_DOCUMENT:
      return Object.assign({}, state, {
        isFetchingPreviewDocument: true,
        error: null,
      });
    case FETCH_PREVIEW_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        previewDocument: action.previewDocument,
        isFetchingPreviewDocument: false,
      });
    case FETCH_PREVIEW_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        isFetchingPreviewDocument: false,
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
        isRemoved: null,
        isUpdated: null,
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
        isFetchingMyDocuments: true,
        currentPage: action.page,
        error: null,
        isDeleted: false,
        orderField: action.orderField,
        order: action.order,
      });
    case LIST_MY_DOCUMENTS_SUCCESS:
      return Object.assign({}, state, {
        myDocumentsList: action.myDocumentsList,
        isFetchingMyDocuments: false,
      });
    case LIST_MY_DOCUMENTS_FAILURE:
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        myDocumentsList: null,
        isFetchingMyDocuments: false,
        error: action.errorMessage,
      });
    case LIST_MY_LAST_DOCUMENTS:
      return Object.assign({}, state, {
        myLastDocumentsList: null,
        isFetchingMyLastDocuments: true,
        error: null,
        orderField: action.orderField,
        order: action.order,
      });
    case LIST_MY_LAST_DOCUMENTS_SUCCESS:
      return Object.assign({}, state, {
        myLastDocumentsList: action.myLastDocumentsList,
        isFetchingMyLastDocuments: false,
      });
    case LIST_MY_LAST_DOCUMENTS_FAILURE:
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        myLastDocumentsList: null,
        isFetchingMyLastDocuments: false,
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
      toast.success(`Questão adicionada com sucesso à prova ${activeDocument.name}`, optionsSuccess);
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
      toast.success(`Questão removida com sucesso da prova ${activeDocument.name}`, optionsSuccess);
      return Object.assign({}, state, {
        isFetchingRemoveQuestion: false,
        isRemoved: true,
        activeDocument,
      });
    }
    case REMOVE_SELECTED_QUESTION_FAILURE:
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        isFetchingRemoveQuestion: false,
        error: action.error,
      });
    case CREATE_DOCUMENT_TOGGLE_MODAL: {
      return Object.assign({}, state, {
        modal: action.modal,
        willAddQuestion: action.willAddQuestion,
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
      toast.success('Cabeçalho atualizado com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        activeDocument: { ...action.activeDocument, questions: state.activeDocument.questions },
        isUpdated: true,
      });
    }
    case UPDATE_DOCUMENT_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        error: action.error,
      });
    }
    case SWITCH_ACTIVE_DOCUMENT: {
      localStorage.setItem('activeDocument', JSON.stringify(action.activeDocument));

      return Object.assign({}, state, {
        activeDocument: action.activeDocument,
      });
    }
    case DELETE_DOCUMENT_SESSION: {
      return Object.assign({}, state, {
        activeDocument: null,
      });
    }
    case DELETE_DOCUMENT: {
      return Object.assign({}, state, {
        isDeletingDocument: true,
        isDeleted: false,
      });
    }
    case DELETE_DOCUMENT_SUCCESS: {
      const newList = state.myDocumentsList.results.filter(item => item.id !== action.idDocumentRemoved);
      let newActive = state.activeDocument;
      if (state.activeDocument && state.activeDocument.id === action.idDocumentRemoved) {
        newActive = null;
        localStorage.setItem('activeDocument', null);
      }
      toast.success('Prova removida com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        activeDocument: newActive,
        isDeleted: true,
        myDocumentsList: { ...state.myDocumentsList, count: state.myDocumentsList.count - 1, results: newList },
      });
    }
    case DELETE_DOCUMENT_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        error: action.error,
        isDeleted: false,
      });
    }
    case DOWNLOAD_DOCUMENT: {
      toast.success('Seu download iniciará a qualquer momento', optionsSuccess);
      return Object.assign({}, state, {
        isDownloadingDocument: true,
        isDowloaded: false,
      });
    }
    case DOWNLOAD_DOCUMENT_SUCCESS: {
      return Object.assign({}, state, {
        isDownloadingDocument: false,
        isDowloaded: true,
      });
    }
    case DOWNLOAD_DOCUMENT_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        isDownloadingDocument: false,
        error: action.error,
      });
    }
    default:
      return state;
  }
};

export default document;
