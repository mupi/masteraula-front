import { apiUrl } from 'helpers/config';

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

  return fetch(`${apiUrl}/documents/${newDocumentData}`, requestOptions)
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


const documentService = {
  fetchDocument,
  createDocument,
  updateDocument,
};

export default documentService;
