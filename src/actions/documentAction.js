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

// Delete document
export const DELETE_DOCUMENT = 'DELETE_DOCUMENT';
export const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const DELETE_DOCUMENT_FAILURE = 'DELETE_DOCUMENT_FAILURE';
export const RESET_DELETE_DOCUMENT = 'RESET_DELETE_DOCUMENT';

// List documents
export const LIST_DOCUMENTS = 'LIST_DOCUMENTS';
export const LIST_DOCUMENTS_SUCCESS = 'LIST_DOCUMENTS_SUCCESS';
export const LIST_DOCUMENTS_FAILURE = 'LIST_DOCUMENTS_FAILURE';

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
