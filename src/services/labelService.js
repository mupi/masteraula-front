import { apiUrl } from 'helpers/config';
// import queryString from 'query-string';
import axios from 'axios';
import { authHeader } from 'helpers';

let call;

function listMyQuestionLabels() {
  if (call) call.cancel();

  call = axios.CancelToken.source();

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
    cancelToken: call.token,

  };

  const url = '/labels/';


  return axios.get(`${apiUrl}${url}`, requestOptions)
    .then(response => response.data).then(myQuestionLabels => myQuestionLabels);
}

/* Create a new label */
function createMyQuestionLabel(newLabelData) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = '/labels/';

  return axios.post(`${apiUrl}${url}`, newLabelData, requestOptions)
    .then(response => response.data).then(newMyQuestionLabel => newMyQuestionLabel);
}

/* Create a new label */
function updateMyQuestionLabel(activeLabel) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = `/label/${activeLabel.id}`;

  return axios.post(`${apiUrl}${url}`, activeLabel, requestOptions)
    .then(response => response.data).then(newMyQuestionLabel => newMyQuestionLabel);
}

// Delete a label given its ID
function deleteMyQuestionLabel(idLabel) {
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

    return idLabel;
  };

  return fetch(`${apiUrl}/labels/${idLabel}/`, requestOptions)
    .then(handleResponse)
    .then(idLabelRemoved => idLabelRemoved);
}

const labelService = {
  listMyQuestionLabels,
  createMyQuestionLabel,
  updateMyQuestionLabel,
  deleteMyQuestionLabel,
};

export default labelService;
