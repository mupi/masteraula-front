import {
  FETCH_BASE_DOCUMENT, FETCH_BASE_DOCUMENT_SUCCESS, FETCH_BASE_DOCUMENT_FAILURE,
  FETCH_ONLINE_TEST, FETCH_ONLINE_TEST_SUCCESS, FETCH_ONLINE_TEST_FAILURE,
  CREATE_ONLINE_TEST, CREATE_ONLINE_TEST_SUCCESS, CREATE_ONLINE_TEST_FAILURE,
  UPDATE_ONLINE_TEST, UPDATE_ONLINE_TEST_SUCCESS, UPDATE_ONLINE_TEST_FAILURE,
  LIST_MY_ONLINE_TESTS, LIST_MY_ONLINE_TESTS_SUCCESS, LIST_MY_ONLINE_TESTS_FAILURE,
  DELETE_ONLINE_TEST_SESSION,
  DELETE_ONLINE_TEST, DELETE_ONLINE_TEST_SUCCESS, DELETE_ONLINE_TEST_FAILURE,
  COPY_ONLINE_TEST, COPY_ONLINE_TEST_SUCCESS, COPY_ONLINE_TEST_FAILURE,


} from 'actions/onlineTestAction';
import { toast } from 'react-toastify';

const initialState = {
  baseDocument: null,
  activeOnlineTest: null,
  isFetchingBaseDocument: false,
  isFetchingOnlineTest: false,
};

const optionsSuccess = {
  className: 'alert__ma-toast--success',
  type: 'success',
};

const optionsError = {
  className: 'alert__ma-toast--error',
  type: 'error',
};

export const onlineTest = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BASE_DOCUMENT:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        isFetchingBaseDocument: true,
        error: null,
        isDeleted: false,
      });
    case FETCH_BASE_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        baseDocument: action.baseDocument,
        isFetchingBaseDocument: false,
      });
    case FETCH_BASE_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        isFetchingBaseDocument: false,
        error: action.error,
      });
    case FETCH_ONLINE_TEST:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        isFetching: true,
        error: null,
        isDeleted: false,
      });
    case FETCH_ONLINE_TEST_SUCCESS:
      return Object.assign({}, state, {
        baseDocument: action.baseDocument,
        isFetching: false,
      });
    case FETCH_ONLINE_TEST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case CREATE_ONLINE_TEST:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        activeOnlineTest: action.newOnlineTest,
        isFetching: false,
      });
    case CREATE_ONLINE_TEST_SUCCESS:
      return Object.assign({}, state, {
        isRemoved: null,
        isUpdated: null,
        activeOnlineTest: action.newOnlineTest,
        isFetching: false,
      });
    case CREATE_ONLINE_TEST_FAILURE:
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });

    case LIST_MY_ONLINE_TESTS:
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
    case LIST_MY_ONLINE_TESTS_SUCCESS:
      return Object.assign({}, state, {
        myDocumentsList: action.myDocumentsList,
        isFetchingMyDocuments: false,
      });
    case LIST_MY_ONLINE_TESTS_FAILURE:
      return Object.assign({}, state, {
        myDocumentsList: null,
        isFetchingMyDocuments: false,
        error: action.errorMessage,
      });
    case UPDATE_ONLINE_TEST: {
      return Object.assign({}, state, {
        isRemoved: null,
        error: null,
        isUpdated: null,
      });
    }
    case UPDATE_ONLINE_TEST_SUCCESS: {
      toast.success('Nome da prova atualizado com sucesso', optionsSuccess);
      return Object.assign({}, state, {
        activeDocument: { ...action.activeDocument, questions: state.activeDocument.questions },
        isUpdated: true,
      });
    }
    case UPDATE_ONLINE_TEST_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        error: action.error,
      });
    }
    case DELETE_ONLINE_TEST_SESSION: {
      return Object.assign({}, state, {
        activeDocument: null,
      });
    }
    case DELETE_ONLINE_TEST: {
      return Object.assign({}, state, {
        isDeletingDocument: true,
        isDeleted: false,
      });
    }
    case DELETE_ONLINE_TEST_SUCCESS: {
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
    case DELETE_ONLINE_TEST_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        error: action.error,
        isDeleted: false,
      });
    }
    case COPY_ONLINE_TEST: {
      return Object.assign({}, state, {
        isRemoved: null,
        error: null,
        isUpdated: null,
      });
    }
    case COPY_ONLINE_TEST_SUCCESS: {
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
    case COPY_ONLINE_TEST_FAILURE: {
      toast.error('Ocorreu um erro com sua solicitação', optionsError);
      return Object.assign({}, state, {
        error: action.error,
      });
    }

    default:
      return state;
  }
};

export default onlineTest;
