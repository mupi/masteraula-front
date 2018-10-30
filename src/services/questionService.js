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

  const disciplinesParams = queryString.stringify({ disciplines: filter.disciplinesSelected.map(item => item.id) });
  const teachingLevelParams = queryString.stringify({ teaching_levels: filter.teachingLevelsSelected.map(item => item.id) });
  const difficultiesParams = queryString.stringify({ difficulties: filter.difficultiesSelected.map(item => item.id) });
  const search = (filter.searchText) ? queryString.stringify({ text: filter.searchText }) : null;

  const url = (search) ? `${apiUrl}/questions/search/?page=${page}&${search}&${disciplinesParams}&${teachingLevelParams}&${difficultiesParams}`
    : `${apiUrl}/questions/?page=${page}&${disciplinesParams}&${teachingLevelParams}&${difficultiesParams}`;

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
