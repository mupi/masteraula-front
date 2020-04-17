import {
  apiUrl,
} from 'helpers/config';
import axios from 'axios';
import {
  authHeader,
} from 'helpers';


// Fetch a Document using ID
function fetchBaseDocument(id) {
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
    .then(activeDocument => activeDocument);
}

// Fetch a onlineTest given its ID
function fetchOnlineTest(id) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },

  };

  const url = `/document_online/${id}/`;

  return axios.get(`${apiUrl}${url}`, requestOptions)
    .then(response => response.data).then(activeOnlineTest => activeOnlineTest);
}

/* Create a new online test */
function createOnlineTest(newOnlineTest, idDocBase) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = `/document_online/?id=${idDocBase}`;

  return axios.post(`${apiUrl}${url}`, newOnlineTest, requestOptions)
    .then(response => response.data).then(newOnlineTestData => newOnlineTestData);
}

function listMyOnlineTest(idDocBase, page) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },

  };

  const url = `${apiUrl}/document_online/?id=${idDocBase}&page=${page}`;


  return axios.get(url, requestOptions)
    .then(response => response.data).then(onlineTestsList => onlineTestsList);
}

const onlineTestService = {
  fetchBaseDocument,
  fetchOnlineTest,
  createOnlineTest,
  listMyOnlineTest,
  /* updateOnlineTest,
  deleteOnlineTest,
  /* copyOnlineTest, */
};

export default onlineTestService;
