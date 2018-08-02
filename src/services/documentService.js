import { apiUrl } from 'helpers/config';

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

function createDocument(newDocumentData) {
  const requestOptions = {
    method: 'GET',
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


const documentService = {
  fetchDocument,
  createDocument,
};

export default documentService;
