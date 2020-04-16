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

  const url = `/class_plans/${id}/`;

  return axios.get(`${apiUrl}${url}`, requestOptions)
    .then(response => response.data).then(activeClassPlan => activeClassPlan);
}

/* Create a new label */
function createOnlineTest(newOnlineTest) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = '/online_test/';

  return axios.post(`${apiUrl}${url}`, newOnlineTest, requestOptions)
    .then(response => response.data).then(newMyQuestionLabel => newMyQuestionLabel);
}


const onlineTestService = {
  fetchBaseDocument,
  fetchOnlineTest,
  createOnlineTest,
  /* listMyOnlineTest,
  updateOnlineTest,
  deleteOnlineTest,
  copyOnlineTest, */
};

export default onlineTestService;
