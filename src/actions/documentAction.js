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
export const ADD_SELECTED_QUESTION_SUCCESS = 'ADD_SELECTED_QUESTION_SUCCESS';
export const ADD_SELECTED_QUESTION_FAILURE = 'ADD_SELECTED_QUESTION_FAILURE';

// Remove selected question from Document
export const REMOVE_SELECTED_QUESTION = 'REMOVE_SELECTED_QUESTION';
export const REMOVE_SELECTED_QUESTION_SUCCESS = 'REMOVE_SELECTED_QUESTION_SUCCESS';
export const REMOVE_SELECTED_QUESTION_FAILURE = 'REMOVE_SELECTED_QUESTION_FAILURE';
// Delete document
export const DELETE_DOCUMENT = 'DELETE_DOCUMENT';
export const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const DELETE_DOCUMENT_FAILURE = 'DELETE_DOCUMENT_FAILURE';
export const RESET_DELETE_DOCUMENT = 'RESET_DELETE_DOCUMENT';

// List documents
export const LIST_DOCUMENTS = 'LIST_DOCUMENTS';
export const LIST_DOCUMENTS_SUCCESS = 'LIST_DOCUMENTS_SUCCESS';
export const LIST_DOCUMENTS_FAILURE = 'LIST_DOCUMENTS_FAILURE';

// List my Documents
export const LIST_MY_DOCUMENTS = 'LIST_MY_DOCUMENTS';
export const LIST_MY_DOCUMENTS_SUCCESS = 'LIST_MY_DOCUMENTS_SUCCESS';
export const LIST_MY_DOCUMENTS_FAILURE = 'LIST_MY_DOCUMENTS_FAILURE';

// Document Create Toggle Modal
export const CREATE_DOCUMENT_TOGGLE_MODAL = 'CREATE_DOCUMENT_TOGGLE_MODAL';

// Switch active document
export const SWITCH_ACTIVE_DOCUMENT = 'SWITCH_ACTIVE_DOCUMENT';

// Delete active document in session
export const DELETE_DOCUMENT_SESSION = 'DELETE_DOCUMENT_SESSION';


export const fetchDocument = (id) => {
  function requestDocument() { return { type: FETCH_DOCUMENT }; }
  function fetchDocumentSuccess(activeDocument) { return { type: FETCH_DOCUMENT_SUCCESS, activeDocument }; }
  function fetchDocumentFailure(error) { return { type: FETCH_DOCUMENT_FAILURE, error }; }
  return (dispatch) => {
    dispatch(requestDocument(id));
    return documentService.fetchDocument(id).then(
      (activeDocument) => {
        dispatch(fetchDocumentSuccess(activeDocument));
      }, (error) => {
        dispatch(fetchDocumentFailure(error));
      },
    );
  };
};

// Create a new document
export const createDocument = (props) => {
  function createNewDocument() { return { type: CREATE_DOCUMENT }; }
  function createDocumentSuccess(newDocument) { return { type: CREATE_DOCUMENT_SUCCESS, newDocument }; }
  function createDocumentFailure(error) { return { type: CREATE_DOCUMENT_FAILURE, error }; }
  return (dispatch) => {
    dispatch(createNewDocument(props));
    return documentService.createDocument(props).then(
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
export const updateDocument = (props) => {
  function updateActiveDocument() { return { type: UPDATE_DOCUMENT }; }
  function updateDocumentSuccess(activeDocument) { return { type: UPDATE_DOCUMENT_SUCCESS, activeDocument }; }
  function updateDocumentFailure(error) { return { type: UPDATE_DOCUMENT_FAILURE, error }; }
  return (dispatch) => {
    dispatch(updateActiveDocument(props));
    return documentService.updateDocument(props).then(
      (activeDocument) => {
        dispatch(updateDocumentSuccess(activeDocument));
      },
      (error) => {
        dispatch(updateDocumentFailure(error));
      },
    );
  };
};

export const listMyDocuments = page => (dispatch) => {
  const success = myDocumentsList => (
    dispatch({ type: LIST_MY_DOCUMENTS_SUCCESS, myDocumentsList }));

  const error = errorMessage => (
    dispatch({ type: LIST_MY_DOCUMENTS_FAILURE, errorMessage }));

  dispatch({ type: LIST_MY_DOCUMENTS, page });
  return documentService.listMyDocuments(page)
    .then(success)
    .catch(error);
};

// Add Selected Question to Document
export const addSelectedQuestion = (idDocument, idQuestion, order) => {
  function addQuestionToDocument() { return { type: ADD_SELECTED_QUESTION }; }
  function addQuestionToDocumentSuccess(addedQuestion) { return { type: ADD_SELECTED_QUESTION_SUCCESS, addedQuestion }; }
  function addQuestionToDocumentFailure(error) { return { type: ADD_SELECTED_QUESTION_FAILURE, error }; }

  return (dispatch) => {
    dispatch(addQuestionToDocument(idDocument, idQuestion, order));
    return documentService.addSelectedQuestion(idDocument, idQuestion, order)
      .then(
        (addedQuestion) => {
          dispatch(addQuestionToDocumentSuccess(addedQuestion));
        },
        (error) => {
          dispatch(addQuestionToDocumentFailure(error));
        },
      );
  };
};

// Remove Selected Question from Document
export const removeSelectedQuestion = (idDocument, idQuestion) => {
  function removeQuestionFromDocument() { return { type: REMOVE_SELECTED_QUESTION }; }
  function removeQuestionFromDocumentSuccess(idRemovedQuestion) { return { type: REMOVE_SELECTED_QUESTION_SUCCESS, idRemovedQuestion }; }
  function removeQuestionFromDocumentFailure(error) { return { type: REMOVE_SELECTED_QUESTION_FAILURE, error }; }
  return (dispatch) => {
    dispatch(removeQuestionFromDocument(idDocument, idQuestion));
    return documentService.removeSelectedQuestion(idDocument, idQuestion)
      .then(
        (idRemovedQuestion) => {
          dispatch(removeQuestionFromDocumentSuccess(idRemovedQuestion));
        },
        (error) => {
          dispatch(removeQuestionFromDocumentFailure(error));
        },
      );
  };
};

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

// Switch active document
export const switchActiveDocument = (doc) => {
  localStorage.setItem('activeDocument', JSON.stringify(doc));
  return { type: SWITCH_ACTIVE_DOCUMENT, activeDocument: doc };
};

// Switch active document
export const deleteDocumentSession = () => {
  localStorage.removeItem('activeDocument');
  return { type: DELETE_DOCUMENT_SESSION };
};
