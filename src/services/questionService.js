import { apiUrl } from 'helpers/config';

const questionService = {
  rateQuestion,
  fetchQuestion,
  listQuestions,
};

function fetchQuestion(id) {
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

  return fetch(`${apiUrl}/questions/${id}/`, requestOptions)
    .then(handleResponse)
    .then(activeQuestion => activeQuestion);
}

function listQuestions(page) {
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

  return fetch(`${apiUrl}/questions/?page=${page}`, requestOptions)
    .then(handleResponse)
    .then(questionPage => questionPage);
}

function rateQuestion() {

}

export default questionService;
