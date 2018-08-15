import {
  FETCH_DOCUMENT, FETCH_DOCUMENT_SUCCESS, FETCH_DOCUMENT_FAILURE,
  CREATE_DOCUMENT, CREATE_DOCUMENT_SUCCESS, CREATE_DOCUMENT_FAILURE,
  UPDATE_DOCUMENT, UPDATE_DOCUMENT_SUCCESS, UPDATE_DOCUMENT_FAILURE,
  LIST_MY_DOCUMENTS, LIST_MY_DOCUMENTS_SUCCESS, LIST_MY_DOCUMENTS_FAILURE,
  ADD_SELECTED_QUESTION,
  REMOVE_SELECTED_QUESTION,
  CREATE_DOCUMENT_TOGGLE_MODAL,

} from 'actions/documentAction';


const initialState = {
  newDocument: { document: null, error: null, loading: false },
  /*activeDocument: {
    document: [
      {
        id: 1,
        name: 'My first document',
        owner: 8,
        questions: [],
        create_date: '2018/08/02',
        secret: true,
        document_header: null,
      },
    ],
    questionsNumber:15,
    name: 'My first document',
    error: null,
    loading: false,
  },*/
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
        activeDocument: action.activeDocument,
        isFetching: false,
      });
    case CREATE_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {
        activeDocument: action.activeDocument,
        isFetching: false,
      });
    case CREATE_DOCUMENT_FAILURE:
      return Object.assign({}, state, {
        activeDocument: action.activeDocument,
        isFetching: false,
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

      });
    case REMOVE_SELECTED_QUESTION: {
      return Object.assign({}, state, {

      });
    }
    case CREATE_DOCUMENT_TOGGLE_MODAL: {
      return Object.assign({}, state, {
        modal: action.modal,
      });
    }
    default:
      return state;
  }
};

export default document;
