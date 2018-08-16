import {
  FETCH_DOCUMENT, FETCH_DOCUMENT_SUCCESS, FETCH_DOCUMENT_FAILURE,
  CREATE_DOCUMENT, CREATE_DOCUMENT_SUCCESS, CREATE_DOCUMENT_FAILURE,
  UPDATE_DOCUMENT, UPDATE_DOCUMENT_SUCCESS, UPDATE_DOCUMENT_FAILURE,
  LIST_MY_DOCUMENTS, LIST_MY_DOCUMENTS_SUCCESS, LIST_MY_DOCUMENTS_FAILURE,
  ADD_SELECTED_QUESTION, ADD_SELECTED_QUESTION_SUCCESS, ADD_SELECTED_QUESTION_FAILURE,
  REMOVE_SELECTED_QUESTION, REMOVE_SELECTED_QUESTION_SUCCESS, REMOVE_SELECTED_QUESTION_FAILURE,
  CREATE_DOCUMENT_TOGGLE_MODAL, SWITCH_ACTIVE_DOCUMENT,

} from 'actions/documentAction';


const initialState = {
  activeDocument: null,
  deletedDocument: { document: null, error: null, loading: false },
  isFetching: false,
};

export const document = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOCUMENT:
      return Object.assign({}, state, {
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
        myDocumentsList: null,
        isFetching: true,
        currentPage: action.page,
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
      });

    case ADD_SELECTED_QUESTION:
      return Object.assign({}, state, {
        isFetchingAddQuestion: true,
        error: null,
      });
    case ADD_SELECTED_QUESTION_SUCCESS:
      return Object.assign({}, state, {
        isFetchingAddQuestion: false,
        addedQuestion: action.addedQuestion,
        activeDocument: { ...state.activeDocument, questions: [...state.activeDocument.questions, action.addedQuestion] },
      });
    case ADD_SELECTED_QUESTION_FAILURE:
      return Object.assign({}, state, {
        isFetchingAddQuestion: false,
        error: action.error,
      });
    case REMOVE_SELECTED_QUESTION:
      return Object.assign({}, state, {
        isFetchingRemoveQuestion: true,
        error: null,
      });
    case REMOVE_SELECTED_QUESTION_SUCCESS: {
      const newQuestionsInDocument = state.activeDocument.questions.filter(question => question.question !== action.idRemovedQuestion);
      return {
        isFetchingRemoveQuestion: false,
        activeDocument: { ...state.activeDocument, questions: newQuestionsInDocument }
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
        isFetching: true,
        error: null,
      });
    }
    case UPDATE_DOCUMENT_SUCCESS: {
      return Object.assign({}, state, {
        activeDocument: { ...action.activeDocument, questions: state.activeDocument.questions },
        isFetching: false,
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
    default:
      return state;
  }
};

export default document;
