import { apiUrl } from 'helpers/config';
import { authHeader } from 'helpers';

// Fetch a Document using ID
function fetchDocument(id) {
  const requestOptions = {
    method: 'GET,',
    headers: { 'Content-Type': 'application/json' },
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
    .then(activeDocument => activeDocument);
}

// Create a New Document
function createDocument(newDocumentData) {
  //TODO: Fix this hardcoded questions
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
                Authorization:authHeader() },
    body: JSON.stringify({...newDocumentData,"questions":[], "secret":true}),
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
    .then(activeDocument => activeDocument);
}


// Update an Active Document
function updateDocument(activeNewDocument) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }

    return data;
  });

  return fetch(`${apiUrl}/documents/${activeNewDocument}`, requestOptions)
    .then(handleResponse)
    .then(activeDocument => activeDocument);
}


// Add a question to document
function addSelectedQuestion(idDocument, idQuestion, order) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: idQuestion,
      order,
    }),
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }

    return data;
  });
  return fetch(`${apiUrl}/documents/${idDocument}/removeQuestion`, requestOptions)
    .then(handleResponse)
    .then(disciplineFilters => disciplineFilters);
}

// Remove a question to document
function removeSelectedQuestion(idDocument, idQuestion) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: idQuestion,
    }),
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }

    return data;
  });
  return fetch(`${apiUrl}/documents/${idDocument}/removeQuestion`, requestOptions)
    .then(handleResponse)
    .then(disciplineFilters => disciplineFilters);
}

const documentService = {
  fetchDocument,
  createDocument,
  updateDocument,
  addSelectedQuestion,
  removeSelectedQuestion,
};

export default documentService;
