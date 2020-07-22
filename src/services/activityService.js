import { apiUrl } from 'helpers/config';
// import queryString from 'query-string';
import axios from 'axios';
import { authHeader } from 'helpers';
import queryString from 'query-string';


function listActivities(page, filter) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };
  const pageParam = queryString.stringify({ page });

  const disciplinesPL = filter.disciplinesSelected.filter(discipline => discipline.id === 2);
  const disciplinesSF = filter.disciplinesSelected.filter(discipline => discipline.id === 11);
  let disciplines = filter.disciplinesSelected;

  if (disciplinesPL.length > 0) disciplines = [...disciplinesPL, { id: 3, name: 'Literatura' }];
  if (disciplinesSF.length > 0) disciplines = [...disciplinesSF, { id: 12, name: 'Filosofia' }];


  const disciplinesParams = queryString.stringify({ disciplines: disciplines.map(item => item.id) });
  const teachingLevelParams = queryString.stringify({ teaching_levels: filter.teachingLevelsSelected.map(item => item.id) });
  const difficultiesParams = queryString.stringify({ difficulties: filter.difficultiesSelected.map(item => item.id) });
  const yearsParams = queryString.stringify({ years: filter.yearsSelected.map(item => item.name) });
  const topicsParams = queryString.stringify({ topics: filter.topicsSelected.map(item => item.id) });

  const search = (filter.searchText) ? queryString.stringify({ text: filter.searchText }) : null;
  const author = (filter.onlyMyActivities) ? queryString.stringify({ author: filter.author }) : '';

  const urlParams = [pageParam, disciplinesParams, teachingLevelParams, difficultiesParams, yearsParams, topicsParams, author, search]
    .filter(p => p)
    .join('&');

  const url = (search)
    ? `/activities/search/?${urlParams}`
    : `/activities/?${urlParams}`;

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }

    return data;
  });

  return fetch(`${apiUrl}${url}`, requestOptions)
    .then(handleResponse)
    .then(activityPage => activityPage);
}


// Fetch a activity given its ID
function fetchActivity(id) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },

  };

  const url = `/activities/${id}/`;


  return axios.get(`${apiUrl}${url}`, requestOptions)
    .then(response => response.data).then(activeActivity => activeActivity);
}

/* Create a new activity */
function createActivity(newActivityData) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = '/activities/';

  return axios.post(`${apiUrl}${url}`, newActivityData, requestOptions)
    .then(response => response.data).then(newActivity => newActivity);
}

/* Update an activity */
function updateActivity(activeActivity) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = `/activities/${activeActivity.id}/`;

  return axios.patch(`${apiUrl}${url}`, activeActivity, requestOptions)
    .then(response => response.data).then(newActivity => newActivity);
}


// Delete an activity given its ID
function deleteActivity(idActivity) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: authHeader(),
    },
  };

  return axios.delete(`${apiUrl}/activities/${idActivity}/`, requestOptions)
    .then(response => response.data).then(() => idActivity);
}


const activityService = {
  listActivities,
  fetchActivity,
  createActivity,
  updateActivity,
  deleteActivity,
};

export default activityService;
