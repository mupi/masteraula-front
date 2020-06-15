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

// Verify a onlineTest given its ID
function verifyOnlineTest(id) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },

  };

  const url = `/document_online/${id}/check_document/`;

  return axios.get(`${apiUrl}${url}`, requestOptions)
    .then(response => response.data).then(validStudentOnlineTest => validStudentOnlineTest);
}

// Verify a onlineTest given its ID
function fetchStudentOnlineTest(id) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },

  };

  const url = `/document_online/${id}/document_student/`;

  return axios.get(`${apiUrl}${url}`, requestOptions)
    .then(response => response.data).then(validStudentOnlineTest => validStudentOnlineTest);
}


// Verify a onlineTest given its ID

/*

Para inserir resultados: POST http://localhost:8000/results/?link={link}
Body:
{
  "student_name": "Glaucia",
  "student_levels": "Superior",
  "start": "2020-03-24T13:03:54.604Z",
  "student_answer": [{"answer_text": "oi", "student_question": 6}]
} */


function sendAnswersOnlineTest(onlineTest, studentAnswers) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },

  };
  const url = `/results/?link=${onlineTest.link}`;

  return axios.post(`${apiUrl}${url}`, studentAnswers, requestOptions)
    .then(response => response.data).then(res => res);
}
/*
Para editar resultados: PATCH http://localhost:8000/results/{id}
Body:
{
  "student_answer": [{"score_answer":3, "id": 21}]
}
Obs: esse id é do grupo de student_answer que vc quer mudar o score
 */

function editAnswersOnlineTest(idStudent, studentAnswers) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },

  };
  const url = `/results/${idStudent}/`;

  return axios.patch(`${apiUrl}${url}`, studentAnswers, requestOptions)
    .then(response => response.data).then(res => res);
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

/* Update a online test */
function updateOnlineTest(idOnlineTest, onlineTestData) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = `/document_online/${idOnlineTest}/`;

  return axios.patch(`${apiUrl}${url}`, onlineTestData, requestOptions)
    .then(response => response.data).then(updatedOnlineTest => updatedOnlineTest);
}


function listMyOnlineTest(idDocBase, page, orderField, order) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },

  };

  const url = `${apiUrl}/document_online/my_documents_online/?id=${idDocBase}`;


  return axios.get(`${url}&page=${page}&order_field=${orderField}&order=${order}`, requestOptions)
    .then(response => response.data).then(onlineTestsList => onlineTestsList);
}

// Delete an online test given its ID
function deleteOnlineTest(idOnlineTest) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: authHeader(),
    },
  };

  return axios.delete(`${apiUrl}/document_online/${idOnlineTest}/`, requestOptions)
    .then(response => response.data).then(() => idOnlineTest);
}

function downloadResults(idDocumentOnline) {
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

  return fetch(`${apiUrl}/document_online/${idDocumentOnline}/generate_list/`, requestOptions)
    .then(handleResponse);
}

const onlineTestService = {
  fetchBaseDocument,
  fetchOnlineTest,
  createOnlineTest,
  listMyOnlineTest,
  updateOnlineTest,
  deleteOnlineTest,
  verifyOnlineTest,
  fetchStudentOnlineTest,
  sendAnswersOnlineTest,
  editAnswersOnlineTest,
  downloadResults,
};

export default onlineTestService;
