import { documentService } from 'services';

// Load single document
export const FETCH_DOCUMENT = 'FETCH_DOCUMENT';
export const FETCH_DOCUMENT_SUCCESS = 'FETCH_DOCUMENT_SUCCESS';
export const FETCH_DOCUMENT_FAILURE = 'FETCH_DOCUMENT_FAILURE';

// Create new document
export const CREATE_DOCUMENT = 'CREATE_DOCUMENT';
export const CREATE_DOCUMENT_SUCCESS = 'CREATE_DOCUMENT_SUCCESS';
export const CREATE_DOCUMENT_FAILURE = 'CREATE_DOCUMENT_FAILURE';
export const RESET_NEW_DOCUMENT = 'RESET_NEW_DOCUMENT';

// Update document header
export const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT';
export const UPDATE_DOCUMENT_SUCCESS = 'UPDATE_DOCUMENT_SUCCESS';
export const UPDATE_DOCUMENT_FAILURE = 'UPDATE_DOCUMENT_FAILURE';
export const RESET_UPDATE_DOCUMENT = 'RESET_UPDATE_DOCUMENT';

// Add selected question to Document
export const ADD_SELECTED_QUESTION = 'ADD_SELECTED_QUESTION';

// Remove selected question from Document
export const REMOVE_SELECTED_QUESTION = 'REMOVE_SELECTED_QUESTION';

// Delete document
export const DELETE_DOCUMENT = 'DELETE_DOCUMENT';
export const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const DELETE_DOCUMENT_FAILURE = 'DELETE_DOCUMENT_FAILURE';
export const RESET_DELETE_DOCUMENT = 'RESET_DELETE_DOCUMENT';

// List documents
export const LIST_DOCUMENTS = 'LIST_DOCUMENTS';
export const LIST_DOCUMENTS_SUCCESS = 'LIST_DOCUMENTS_SUCCESS';
export const LIST_DOCUMENTS_FAILURE = 'LIST_DOCUMENTS_FAILURE';

// Document Create Toggle Modal
export const CREATE_DOCUMENT_TOGGLE_MODAL = 'CREATE_DOCUMENT_TOGGLE_MODAL';

export const fetchDocument = (id) => {
  function requestDocument() { return { type: FETCH_DOCUMENT }; }
  function fetchDocumentSuccess(activeDocument) { return { type: FETCH_DOCUMENT_SUCCESS, activeDocument }; }
  function fetchDocumentFailure(error) { return { type: FETCH_DOCUMENT_FAILURE, error }; }
  return (dispatch) => {
    dispatch(requestDocument(id));
    return documentService.fetchDocument(id)
      .then(
        (activeDocument) => {
          dispatch(fetchDocumentSuccess(activeDocument));
        },
        (error) => {
          dispatch(fetchDocumentFailure(error));
        },
      );
  };
};

// Create a new document  (?)
export const createDocument = (props) => {
  function createNewDocument() { return { type: CREATE_DOCUMENT }; }
  function createDocumentSuccess(newDocument) { return { type: CREATE_DOCUMENT_SUCCESS, newDocument }; }
  function createDocumentFailure(error) { return { type: CREATE_DOCUMENT_FAILURE, error }; }
  return (dispatch) => {
    dispatch(createNewDocument(props));
    return documentService.createDocument(props)
      .then(
        (newDocument) => {
          dispatch(createDocumentSuccess(newDocument));
        },
        (error) => {
          dispatch(createDocumentFailure(error));
        },
      );
  };
};

// Update an active Document
export const updateDocument = (activeNewDocument) => {
  function updateActiveDocument() { return { type: UPDATE_DOCUMENT }; }
  function updateDocumentSuccess(activeDocument) { return { type: UPDATE_DOCUMENT_SUCCESS, activeDocument }; }
  function updateDocumentFailure(error) { return { type: UPDATE_DOCUMENT_FAILURE, error }; }
  return (dispatch) => {
    dispatch(updateActiveDocument());
    return documentService.updateDocument(activeNewDocument)
      .then(
        (activeDocument) => {
          dispatch(updateDocumentSuccess(activeDocument));
        },
        (error) => {
          dispatch(updateDocumentFailure(error));
        },
      );
  };
};

// Add Selected Question to Document
export const addSelectedQuestion = (idDocument, idQuestion) => ({
  type: REMOVE_SELECTED_QUESTION, idDocument, idQuestion,
});

// Remove Selected Question from Document
export const removeSelectedQuestion = (idDocument, idQuestion) => ({
  type: ADD_SELECTED_QUESTION, idDocument, idQuestion,
});

export function resetNewDocument() {
  return {
    type: RESET_NEW_DOCUMENT,
  };
}

// Create Document Toggle Modal
export const toggleModal = modal => ({
  type: CREATE_DOCUMENT_TOGGLE_MODAL,
  modal: !modal,
});
