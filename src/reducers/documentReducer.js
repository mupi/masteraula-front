import {
  FETCH_DOCUMENT, FETCH_DOCUMENT_SUCCESS, FETCH_DOCUMENT_FAILURE,
  CREATE_DOCUMENT, CREATE_DOCUMENT_SUCCESS, CREATE_DOCUMENT_FAILURE,
  UPDATE_DOCUMENT, UPDATE_DOCUMENT_SUCCESS, UPDATE_DOCUMENT_FAILURE,
  ADD_SELECTED_QUESTION,
  REMOVE_SELECTED_QUESTION,
  CREATE_DOCUMENT_TOGGLE_MODAL,

} from 'actions/documentAction';


const initialState = {
  newDocument: { document: null, error: null, loading: false },
  activeDocument: { document: null, error: null, loading: false },
  deletedDocument: { document: null, error: null, loading: false },
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
