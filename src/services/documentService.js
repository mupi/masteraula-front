import { apiUrl } from 'helpers/config';
import { authHeader } from 'helpers';
import axios from 'axios';

// Fetch a Document using ID
function fetchDocument(id) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }

    return data;
  });

  return fetch(`${apiUrl}/documents/${id}/`, requestOptions)
    .then(handleResponse)
    .then((activeDocument) => {
      localStorage.setItem('activeDocument', JSON.stringify(activeDocument));
      return activeDocument;
    });
}

// Fetch a Document using ID
function fetchPublicDocument(id) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }

    return data;
  });

  return fetch(`${apiUrl}/document_publication/${id}/`, requestOptions)
    .then(handleResponse)
    .then((activePublicDocument) => {
      localStorage.setItem('activePublicDocument', JSON.stringify(activePublicDocument));
      return activePublicDocument;
    });
}


// Fetch a Document using ID for preview
function fetchPreviewDocument(id) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }

    return data;
  });

  return fetch(`${apiUrl}/documents/${id}/`, requestOptions)
    .then(handleResponse)
    .then(previewDocument => previewDocument);
}

// Create a New Document
function createDocument(newDocumentData) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
    body: JSON.stringify({ ...newDocumentData, secret: true }),
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }
    return data;
  });

  return fetch(`${apiUrl}/documents/`, requestOptions)
    .then(handleResponse)
    .then((activeDocument) => {
      localStorage.setItem('activeDocument', JSON.stringify(activeDocument));
      return activeDocument;
    });
}

// Update an Active Document
function updateDocument(activeNewDocument) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
    body: JSON.stringify({ ...activeNewDocument, secret: true }),
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data || 'Something went wrong');
      return Promise.reject(error);
    }

    return data;
  });

  const idDocument = activeNewDocument.id;

  return fetch(`${apiUrl}/documents/${idDocument}/`, requestOptions)
    .then(handleResponse)
    .then((activeDocument) => {
      localStorage.setItem('activeDocument', JSON.stringify(activeDocument));
      return activeDocument;
    });
}

function listMyDocuments(page, orderField, order) {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: authHeader(),
    },
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data || 'Something went wrong');
      return Promise.reject(error);
    }

    return data;
  });

  return fetch(`${apiUrl}/documents/my_documents/?page=${page}&order_field=${orderField}&order=${order}`, requestOptions)
    .then(handleResponse)
    .then(activeDocument => activeDocument);
}

function listMyDocumentsCardsModal(page, orderField, order) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },

  };

  const url = '/documents/my_documents_cards/';


  return axios.get(`${apiUrl}${url}?page=${page}&order_field=${orderField}&order=${order}`, requestOptions)
    .then(response => response.data).then(classPlans => classPlans);
}


function listMyLastDocuments(page, orderField, order) {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: authHeader(),
    },
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data || 'Something went wrong');
      return Promise.reject(error);
    }

    return data;
  });

  return fetch(`${apiUrl}/documents/my_documents/?page=${page}&order_field=${orderField}&order=${order}`, requestOptions)
    .then(handleResponse)
    .then(activeDocument => activeDocument);
}

// Add a question to Active Document
function addSelectedQuestion(idDocument, idQuestion, order) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
    body: JSON.stringify({
      question: idQuestion,
      order,
    }),
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.detail);
      return Promise.reject(error);
    }
    return data;
  });

  return fetch(`${apiUrl}/documents/${idDocument}/add_question/`, requestOptions)
    .then(handleResponse)
    .then(addedQuestion => addedQuestion);
}


// Remove a question from Active Document
function removeSelectedQuestion(idDocument, idQuestion) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
    body: JSON.stringify({
      question: idQuestion,
    }),
  };

  const handleResponse = (response) => {
    if (!response.ok) {
      return Promise.reject();
    }

    return idQuestion;
  };

  return fetch(`${apiUrl}/documents/${idDocument}/remove_question/`, requestOptions)
    .then(handleResponse)
    .then(idRemovedQuestion => idRemovedQuestion);
}

// Delete a document given its ID
function deleteDocument(idDocument) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: authHeader(),
    },
  };

  const handleResponse = (response) => {
    if (!response.ok) {
      return Promise.reject();
    }

    return idDocument;
  };

  return fetch(`${apiUrl}/documents/${idDocument}/`, requestOptions)
    .then(handleResponse)
    .then(idRemovedDocument => idRemovedDocument);
}

// Dowload a document docx file given its ID
function downloadDocument(idDocument, answers = false, sources = false) {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: authHeader(),
    },
  };

  const handleResponse = (response) => {
    if (!response.ok) {
      return Promise.reject();
    }

    return response.blob();
  };

  return fetch(`${apiUrl}/documents/${idDocument}/generate_list/?answers=${answers}&sources=${sources}`, requestOptions)
    .then(handleResponse);
}

function copyDocument(activeNewDocument) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data || 'Something went wrong');
      return Promise.reject(error);
    }

    return data;
  });

  const idDocument = activeNewDocument.id;

  return fetch(`${apiUrl}/documents/${idDocument}/copy_document/`, requestOptions)
    .then(handleResponse)
    .then((activeDocument) => {
      localStorage.setItem('activeDocument', JSON.stringify(activeDocument));
      return activeDocument;
    });
}


function getNumberDocxDownloaded() {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }

    return data;
  });

  return fetch(`${apiUrl}/document_download/`, requestOptions)
    .then(handleResponse)
    .then(numberDocxDownloaded => numberDocxDownloaded);
}

const documentService = {
  fetchDocument,
  fetchPublicDocument,
  fetchPreviewDocument,
  createDocument,
  updateDocument,
  listMyDocuments,
  listMyLastDocuments,
  addSelectedQuestion,
  removeSelectedQuestion,
  deleteDocument,
  downloadDocument,
  copyDocument,
  getNumberDocxDownloaded,
  listMyDocumentsCardsModal,
};

export default documentService;
