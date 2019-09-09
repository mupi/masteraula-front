import { documentService } from 'services';
import { history } from 'helpers/history';
import FileSaver from 'file-saver';

import {
  LIST_DOCUMENTS_AFTER_ADDQUESTION_SUCCESS,
  LIST_DOCUMENTS_AFTER_REMOVEQUESTION_SUCCESS,
} from 'actions/questionAction';
import { hideModal } from 'actions/modalAction';


// Load single document
export const FETCH_DOCUMENT = 'FETCH_DOCUMENT';
export const FETCH_DOCUMENT_SUCCESS = 'FETCH_DOCUMENT_SUCCESS';
export const FETCH_DOCUMENT_FAILURE = 'FETCH_DOCUMENT_FAILURE';

// Load preview document
export const FETCH_PREVIEW_DOCUMENT = 'FETCH_PREVIEW_DOCUMENT';
export const FETCH_PREVIEW_DOCUMENT_SUCCESS = 'FETCH_PREVIEW_DOCUMENT_SUCCESS';
export const FETCH_PREVIEW_DOCUMENT_FAILURE = 'FETCH_PREVIEW_DOCUMENT_FAILURE';

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

// List my Documents
export const LIST_MY_DOCUMENTS = 'LIST_MY_DOCUMENTS';
export const LIST_MY_DOCUMENTS_SUCCESS = 'LIST_MY_DOCUMENTS_SUCCESS';
export const LIST_MY_DOCUMENTS_FAILURE = 'LIST_MY_DOCUMENTS_FAILURE';

// List my Last 5 Documents
export const LIST_MY_LAST_DOCUMENTS = 'LIST_MY_LAST_DOCUMENTS';
export const LIST_MY_LAST_DOCUMENTS_SUCCESS = 'LIST_MY_LAST_DOCUMENTS_SUCCESS';
export const LIST_MY_LAST_DOCUMENTS_FAILURE = 'LIST_MY_LAST_DOCUMENTS_FAILURE';

// Document Create Toggle Modal
export const CREATE_DOCUMENT_TOGGLE_MODAL = 'CREATE_DOCUMENT_TOGGLE_MODAL';

// Switch active document
export const SWITCH_ACTIVE_DOCUMENT = 'SWITCH_ACTIVE_DOCUMENT';

// Delete active document in session
export const DELETE_DOCUMENT_SESSION = 'DELETE_DOCUMENT_SESSION';

// Download the document
export const DOWNLOAD_DOCUMENT = 'DOWNLOAD_DOCUMENT';
export const DOWNLOAD_DOCUMENT_SUCCESS = 'DOWNLOAD_DOCUMENT_SUCCESS';
export const DOWNLOAD_DOCUMENT_FAILURE = 'DOWNLOAD_DOCUMENT_FAILURE';

// Copy Document
export const COPY_DOCUMENT = 'COPY_DOCUMENT';
export const COPY_DOCUMENT_SUCCESS = 'COPY_DOCUMENT_SUCCESS';
export const COPY_DOCUMENT_FAILURE = 'COPY_DOCUMENT_FAILURE';

// Add question to selected document
export const ADDQUESTION_SELECTED_DOCUMENT = 'ADDQUESTION_SELECTED_DOCUMENT';
export const ADDQUESTION_SELECTED_DOCUMENT_SUCCESS = 'ADDQUESTION_SELECTED_DOCUMENT_SUCCESS';
export const ADDQUESTION_SELECTED_DOCUMENT_FAILURE = 'ADDQUESTION_SELECTED_DOCUMENT_FAILURE';

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

export const fetchPreviewDocument = (id) => {
  function requestDocument() { return { type: FETCH_PREVIEW_DOCUMENT }; }
  function fetchDocumentSuccess(previewDocument) { return { type: FETCH_PREVIEW_DOCUMENT_SUCCESS, previewDocument }; }
  function fetchDocumentFailure(error) { return { type: FETCH_PREVIEW_DOCUMENT_FAILURE, error }; }
  return (dispatch, getState) => {
    if (getState().document.isFetchingPreviewDocument) {
      return 1;
    }
    dispatch(requestDocument(id));
    return documentService.fetchDocument(id).then(
      (previewDocument) => {
        dispatch(fetchDocumentSuccess(previewDocument));
      }, (error) => {
        dispatch(fetchDocumentFailure(error));
      },
    );
  };
};

// Create a new document
export const createDocument = (props, isRedirect = true) => {
  function createNewDocument() { return { type: CREATE_DOCUMENT }; }
  function createDocumentSuccess(newDocument) { return { type: CREATE_DOCUMENT_SUCCESS, newDocument }; }
  function createDocumentFailure(error) { return { type: CREATE_DOCUMENT_FAILURE, error }; }
  return (dispatch) => {
    dispatch(createNewDocument(props));
    return documentService.createDocument(props).then(
      (newDocument) => {
        dispatch(createDocumentSuccess(newDocument));
        if (isRedirect) { history.push('/question-base/1'); }
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

// listMyDocuments using filters - v2019
export const listMyDocuments = (page, orderField, order) => {
  function requestDocumentPage() {
    return {
      type: LIST_MY_DOCUMENTS, page, orderField, order,
    };
  }
  function fetchDocumentPageSuccess(myDocumentsList) { return { type: LIST_MY_DOCUMENTS_SUCCESS, myDocumentsList }; }
  function fetchDocumentPageFailure(errorMessage) { return { type: LIST_MY_DOCUMENTS_FAILURE, errorMessage }; }
  return (dispatch, getState) => {
    if (getState().document.isFetchingMyDocuments) {
      return 1;
    }
    dispatch(requestDocumentPage());
    return documentService.listMyDocuments(page, orderField, order)
      .then(
        (activeDocument) => {
          dispatch(fetchDocumentPageSuccess(activeDocument));
        },
        (error) => {
          dispatch(fetchDocumentPageFailure(error));
          history.push('/documents/1');
        },
      );
  };
};

// Shown in Top Menu - Only 5 documents
export const listMyLastDocuments = (page, orderField, order) => (dispatch) => {
  const success = myLastDocumentsList => (
    dispatch({ type: LIST_MY_LAST_DOCUMENTS_SUCCESS, myLastDocumentsList }));

  const error = errorMessage => (
    dispatch({ type: LIST_MY_LAST_DOCUMENTS_FAILURE, errorMessage }));

  dispatch({
    type: LIST_MY_LAST_DOCUMENTS, page, orderField, order,
  });
  return documentService.listMyLastDocuments(page, orderField, order)
    .then(success)
    .catch(error);
};

// Add Selected Question to Document
export const addSelectedQuestion = (idDocument, idQuestion, order) => {
  function addQuestionToDocument() { return { type: ADD_SELECTED_QUESTION, idAddedQuestion: idQuestion }; }
  function addQuestionToDocumentSuccess(addedQuestion) { return { type: ADD_SELECTED_QUESTION_SUCCESS, addedQuestion }; }
  function addQuestionToDocumentFailure(error) { return { type: ADD_SELECTED_QUESTION_FAILURE, error }; }

  function listDocumentsAfterAddQuestionSuccess(addedQuestion) { return { type: LIST_DOCUMENTS_AFTER_ADDQUESTION_SUCCESS, addedQuestion }; }

  return (dispatch, getState) => {
    if (getState().document.isFetchingAddQuestion) {
      return 1;
    }
    dispatch(addQuestionToDocument(idDocument, idQuestion, order));
    return documentService.addSelectedQuestion(idDocument, idQuestion, order)
      .then(
        (addedQuestion) => {
          dispatch(addQuestionToDocumentSuccess(addedQuestion));
          dispatch(listDocumentsAfterAddQuestionSuccess(addedQuestion));
        },
        (error) => {
          dispatch(addQuestionToDocumentFailure(error));
        },
      );
  };
};

// Remove Selected Question from Document
export const removeSelectedQuestion = (idDocument, idQuestion) => {
  function removeQuestionFromDocument() { return { type: REMOVE_SELECTED_QUESTION, idRemovedQuestion: idQuestion }; }
  function removeQuestionFromDocumentSuccess(idRemovedQuestion) { return { type: REMOVE_SELECTED_QUESTION_SUCCESS, idRemovedQuestion }; }
  function removeQuestionFromDocumentFailure(error) { return { type: REMOVE_SELECTED_QUESTION_FAILURE, error }; }

  function listDocumentsAfterRemoveQuestionSuccess(addedQuestion) { return { type: LIST_DOCUMENTS_AFTER_REMOVEQUESTION_SUCCESS, addedQuestion }; }

  return (dispatch) => {
    dispatch(removeQuestionFromDocument(idDocument, idQuestion));
    return documentService.removeSelectedQuestion(idDocument, idQuestion)
      .then(
        (idRemovedQuestion) => {
          dispatch(removeQuestionFromDocumentSuccess(idRemovedQuestion));
          dispatch(listDocumentsAfterRemoveQuestionSuccess(idRemovedQuestion));
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
export const toggleModal = (modal, question) => ({
  type: CREATE_DOCUMENT_TOGGLE_MODAL,
  modal: !modal,
  willAddQuestion: question || null,
});

// Clear idQuestion when user is creating a new doc. Set idQuestion when user presses "add question"
export const setQuestionIdToNewDocument = (question = null) => ({
  type: CREATE_DOCUMENT_TOGGLE_MODAL,
  willAddQuestion: question || null,
});


// Switch active document
export const switchActiveDocument = (doc, isRedirect = false) => {
  function requestDocument() { return { type: FETCH_DOCUMENT }; }
  function fetchDocumentSuccess(activeDocument) { return { type: SWITCH_ACTIVE_DOCUMENT, activeDocument }; }
  function fetchDocumentFailure(error) { return { type: FETCH_DOCUMENT_FAILURE, error }; }

  return (dispatch) => {
    dispatch(requestDocument(doc.id));
    return documentService.fetchDocument(doc.id).then(
      (activeDocument) => {
        dispatch(fetchDocumentSuccess(activeDocument));
        localStorage.setItem('activeDocument', JSON.stringify(activeDocument));
        if (isRedirect) history.push('/edit-document');
      }, (error) => {
        dispatch(fetchDocumentFailure(error));
      },
    );
  };
};

// delete document from session
export const deleteDocumentSession = () => {
  localStorage.removeItem('activeDocument');
  return { type: DELETE_DOCUMENT_SESSION };
};

export const deleteDocument = (idDocument) => {
  function deleteSelectedDocument() { return { type: DELETE_DOCUMENT }; }
  function deleteSelectedDocumentSuccess(idDocumentRemoved) { return { type: DELETE_DOCUMENT_SUCCESS, idDocumentRemoved }; }
  function deleteSelectedDocumentFailure(error) { return { type: DELETE_DOCUMENT_FAILURE, error }; }
  return (dispatch) => {
    dispatch(deleteSelectedDocument(idDocument));
    return documentService.deleteDocument(idDocument)
      .then(
        (idDocumentRemoved) => {
          dispatch(deleteSelectedDocumentSuccess(idDocumentRemoved));
        },
        (error) => {
          dispatch(deleteSelectedDocumentFailure(error));
        },
      );
  };
};

export const downloadDocument = (props) => {
  const downloadSelectedDocument = () => ({ type: DOWNLOAD_DOCUMENT });
  const downloadSelectedDocumentSuccess = () => ({ type: DOWNLOAD_DOCUMENT_SUCCESS });
  const downloadSelectedDocumentFailure = error => ({ type: DOWNLOAD_DOCUMENT_FAILURE, error });

  return (dispatch, getState) => {
    if (getState().document.isDownloadingDocument) {
      return 1;
    }
    dispatch(downloadSelectedDocument(props));
    dispatch(hideModal());

    return documentService.downloadDocument(props, props.documentId)
      .then((blob) => {
        FileSaver.saveAs(blob, `${props.documentName}.docx`);
        dispatch(downloadSelectedDocumentSuccess());
      },
      (error) => {
        dispatch(downloadSelectedDocumentFailure(error));
      });
  };
};

export const copyDocument = (props) => {
  function copySelectedDocument() { return { type: COPY_DOCUMENT }; }
  function copySelectedDocumentSuccess(activeDocument) { return { type: COPY_DOCUMENT_SUCCESS, activeDocument }; }
  function copySelectedDocumentFailure(error) { return { type: COPY_DOCUMENT_FAILURE, error }; }
  return (dispatch) => {
    dispatch(copySelectedDocument(props));
    return documentService.copyDocument(props).then(
      (activeDocument) => {
        dispatch(copySelectedDocumentSuccess(activeDocument));
      },
      (error) => {
        dispatch(copySelectedDocumentFailure(error));
      },
    );
  };
};

export const addQuestionAfterSelectingDocument = (doc, idQuestion) => {
  function requestDocument() { return { type: FETCH_DOCUMENT }; }
  function fetchDocumentSuccess(activeDocument) { return { type: SWITCH_ACTIVE_DOCUMENT, activeDocument }; }
  function fetchDocumentFailure(error) { return { type: FETCH_DOCUMENT_FAILURE, error }; }

  return (dispatch) => {
    dispatch(requestDocument(doc.id));
    return documentService.fetchDocument(doc.id).then(
      (activeDocument) => {
        dispatch(fetchDocumentSuccess(activeDocument));
        localStorage.setItem('activeDocument', JSON.stringify(activeDocument));
        const wasAddedBefore = activeDocument.questions.filter(question => question.question.id === parseInt(idQuestion, 10));
        if (wasAddedBefore.length === 0) { return dispatch(addSelectedQuestion(doc.id, idQuestion)); }
      }, (error) => {
        dispatch(fetchDocumentFailure(error));
      },
    );
  };
};


/* Example of chain dispatch
  export function addQuestionAfterSelectingDocument(doc, idQuestion) {
    return (dispatch) => {
      return dispatch(switchActiveDocument(doc)).then(() => {
        return dispatch(addSelectedQuestion(doc.id, idQuestion,0))
      })
    }
} */
