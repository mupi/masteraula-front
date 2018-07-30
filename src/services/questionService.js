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

function listQuestions(page, filters) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

const queryString = require('query-string');
const disciplinesParams = queryString.stringify({disciplines: filters.disciplinesSelected });
const teachingLevelParams = queryString.stringify({teaching_levels: filters.teachingLevelsSelected });
const difficultiesParams = queryString.stringify({difficulties: filters.difficultiesSelected });
const url=`${apiUrl}/questions/?page=${page}&${disciplinesParams}&${teachingLevelParams}&${difficultiesParams}`
console.log(url);

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }

    return data;
  });

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then(questionPage => questionPage);
}


//Question rating
function rateQuestion() {

}

export default questionService;
