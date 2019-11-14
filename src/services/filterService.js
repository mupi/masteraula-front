import { apiUrl } from 'helpers/config';
import axios from 'axios';
import { authHeader } from 'helpers';
import queryString from 'query-string';

// Get all disciplines that will be used in SideBar
function listDisciplineFilters() {
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

  return fetch(`${apiUrl}/disciplines/`, requestOptions)
    .then(handleResponse)
    .then(disciplineFilters => disciplineFilters);
}

// Get all TeachingLevels that will be used in SideBar
function listTeachingLevelFilters() {
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

  return fetch(`${apiUrl}/teaching_levels/`, requestOptions)
    .then(handleResponse)
    .then(teachingLevelFilters => teachingLevelFilters);
}


// Get all Sources that will be used in SideBar
function listSourceFilters() {
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

  return fetch(`${apiUrl}/sources/`, requestOptions)
    .then(handleResponse)
    .then(sourceFilters => sourceFilters);
}

// Get all Years that will be used in SideBar
function listYearFilters() {
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

  return fetch(`${apiUrl}/years/`, requestOptions)
    .then(handleResponse)
    .then(yearFilters => yearFilters);
}

function listTopicFilters(disciplinesSelected, topicsSelected, filter) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const disciplinesParams = queryString.stringify({ disciplines: disciplinesSelected.map(item => item.id) });
  const topicsParams = queryString.stringify({ topics: topicsSelected.map(item => item.id) });

  const teachingLevelParams = queryString.stringify({ teaching_levels: filter.teachingLevelsSelected.map(item => item.id) });
  const difficultiesParams = queryString.stringify({ difficulties: filter.difficultiesSelected.map(item => item.id) });
  const sourcesParams = queryString.stringify({ sources: filter.sourcesSelected.map(item => item.name) });
  const yearsParams = queryString.stringify({ years: filter.yearsSelected.map(item => item.name) });
  const author = (filter.onlyMyQuestions) ? queryString.stringify({ author: filter.author }) : '';
  const urlParams = [disciplinesParams, teachingLevelParams, difficultiesParams,
    sourcesParams, yearsParams, topicsParams, author]
    .filter(p => p)
    .join('&');

  const url = `/topics/related_topics/?${urlParams}`;

  return axios.get(`${apiUrl}${url}`, requestOptions)
    .then(response => response.data).then(topicSuggestions => topicSuggestions);
}


const filterService = {
  listDisciplineFilters,
  listTeachingLevelFilters,
  listSourceFilters,
  listYearFilters,
  listTopicFilters,
};

export default filterService;
