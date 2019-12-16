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

/* Update a label */
function updateMyQuestionLabel(activeLabel) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = `/labels/${activeLabel.id}/`;

  return axios.patch(`${apiUrl}${url}`, activeLabel, requestOptions)
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

  return axios.delete(`${apiUrl}/labels/${idLabel}/`, requestOptions)
    .then(response => response.data).then(() => idLabel);
}


// Add a label to Question
function addSelectedLabelToQuestion(idQuestion, idLabel) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const question = { id: idQuestion };


  return axios.post(`${apiUrl}/labels/${idLabel}/add_question/`, question, requestOptions)
    .then(response => response.data).then(addedLabel => addedLabel);
}


// Remove a label from a Question
function removeSelectedLabelToQuestion(idQuestion, idLabel) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };


  const question = { id: idQuestion };

  return fetch(`${apiUrl}/labels/${idLabel}/remove_question/`, question, requestOptions)
    .then(response => response.data).then(() => idQuestion);
}

const labelService = {
  listMyQuestionLabels,
  createMyQuestionLabel,
  updateMyQuestionLabel,
  deleteMyQuestionLabel,
  addSelectedLabelToQuestion,
  removeSelectedLabelToQuestion,
};

export default labelService;
