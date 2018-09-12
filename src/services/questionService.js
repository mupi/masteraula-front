import { apiUrl } from 'helpers/config';
import { authHeader } from 'helpers';
import queryString from 'query-string';

function fetchQuestion(id) {
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

  return fetch(`${apiUrl}/questions/${id}/`, requestOptions)
    .then(handleResponse)
    .then(activeQuestion => activeQuestion);
}

function listQuestions(page, filter) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const disciplinesParams = queryString.stringify({ disciplines: filter.disciplinesSelected });
  const teachingLevelParams = queryString.stringify({ teaching_levels: filter.teachingLevelsSelected });
  const difficultiesParams = queryString.stringify({ difficulties: filter.difficultiesSelected });
  const url = `${apiUrl}/questions/?page=${page}&${disciplinesParams}&${teachingLevelParams}&${difficultiesParams}`;

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


// Question rating
function rateQuestion() {

}

const questionService = {
  rateQuestion,
  fetchQuestion,
  listQuestions,
};

export default questionService;
