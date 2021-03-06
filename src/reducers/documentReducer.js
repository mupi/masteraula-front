import {
  FETCH_DOCUMENT, FETCH_DOCUMENT_SUCCESS, FETCH_DOCUMENT_FAILURE,
  FETCH_PUBLIC_DOCUMENT, FETCH_PUBLIC_DOCUMENT_SUCCESS, FETCH_PUBLIC_DOCUMENT_FAILURE,
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
  COPY_DOCUMENT, COPY_DOCUMENT_FAILURE, COPY_DOCUMENT_SUCCESS,
  GET_NUMBER_DOCX_DOWNLOADED, GET_NUMBER_DOCX_DOWNLOADED_SUCCESS, GET_NUMBER_DOCX_DOWNLOADED_FAILURE,

  LIST_MY_DOCUMENTS_MODAL, LIST_MY_DOCUMENTS_MODAL_SUCCESS, LIST_MY_DOCUMENTS_MODAL_FAILURE,
  SET_CURRENT_PAGE_MODAL,

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
    case FETCH_PUBLIC_DOCUMENT:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        isFetchingPublicDocument: true,
        errorFetchingPublicDocument: null,
        isDeleted: false,
      });
    case FETCH_PUBLIC_DOCUMENT_SUCCESS:
      localStorage.setItem('activePublicDocument', JSON.stringify(state.activePublicDocument));
      return Object.assign({}, state, {
        activePublicDocument: action.activePublicDocument,
        isFetchingPublicDocument: false,
      });
    case FETCH_PUBLIC_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        isFetchingPublicDocument: false,
        errorFetchingPublicDocument: true,
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
      toast.success(`Prova em edição: ${action.newDocument.name}`, optionsSuccess);
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
        //  orderField: action.orderField,
        //  order: action.order,
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
        idAddedQuestion: action.idAddedQuestion,
      });
    case ADD_SELECTED_QUESTION_SUCCESS: {
      const activeDocument = { ...state.activeDocument, questions: [...state.activeDocument.questions, action.addedQuestion] };
      localStorage.setItem('activeDocument', JSON.stringify(activeDocument));
      toast.success(`Questão adicionada com sucesso à prova ${activeDocument.name}`, optionsSuccess);
      return Object.assign({}, state, {
        isFetchingAddQuestion: false,
        activeDocument,
        idAddedQuestion: null,
      });
    }
    case ADD_SELECTED_QUESTION_FAILURE:
      return Object.assign({}, state, {
        isFetchingAddQuestion: false,
        error: action.error,
        idAddedQuestion: null,
      });
    case REMOVE_SELECTED_QUESTION:
      return Object.assign({}, state, {
        isFetchingRemoveQuestion: true,
        idRemovedQuestion: action.idRemovedQuestion,
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
        idRemovedQuestion: null,
      });
    }
    case REMOVE_SELECTED_QUESTION_FAILURE:
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        isFetchingRemoveQuestion: false,
        error: action.error,
        idRemovedQuestion: null,
      });
    case CREATE_DOCUMENT_TOGGLE_MODAL: {
      return Object.assign({}, state, {
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
      toast.success('Nome da prova atualizado com sucesso', optionsSuccess);
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
      toast.success(`Prova em edição: ${action.activeDocument.name}`, optionsSuccess);

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
    case COPY_DOCUMENT: {
      return Object.assign({}, state, {
        isRemoved: null,
        error: null,
        isUpdated: null,
      });
    }
    case COPY_DOCUMENT_SUCCESS: {
      toast.success('Cópia da prova realizada com sucesso', optionsSuccess);

      const questionsAvailable = action.activeDocument.questions.filter(i => !i.question.disabled);
      const copiedDocument = { ...action.activeDocument, questions: [...questionsAvailable] };

      return Object.assign({}, state, {
        activeDocument: { ...copiedDocument },
        myDocumentsList: state.myDocumentsList ? {
          ...state.myDocumentsList,
          results: [...state.myDocumentsList.results, copiedDocument],
          count: state.myDocumentsList.count + 1,
        } : {
          results: [copiedDocument],
          count: 1,
        },
      });
    }
    case COPY_DOCUMENT_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        error: action.error,
      });
    }
    case GET_NUMBER_DOCX_DOWNLOADED: {
      return Object.assign({}, state, {
        isFetchingNumberDocx: true,
      });
    }
    case GET_NUMBER_DOCX_DOWNLOADED_SUCCESS: {
      return Object.assign({}, state, {
        isFetchingNumberDocx: false,
        numberDocxDownloaded: action.numberDocxDownloaded,
      });
    }
    case GET_NUMBER_DOCX_DOWNLOADED_FAILURE: {
      return Object.assign({}, state, {
        isFetchingNumberDocx: false,
        error: action.error,
      });
    }
    case LIST_MY_DOCUMENTS_MODAL:
      return Object.assign({}, state, {
        currentPageModal: action.currentPageModal,
        isFetching: true,
        error: null,
      });
    case LIST_MY_DOCUMENTS_MODAL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        documentPageModal: action.documentPageModal,
      });
    case LIST_MY_DOCUMENTS_MODAL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case SET_CURRENT_PAGE_MODAL:
      return Object.assign({}, state, {
        currentPageModal: action.currentPageModal,
      });

    default:
      return state;
  }
};

export default document;
