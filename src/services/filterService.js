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

function listTopicFilters(disciplinesSelected, topicsSelected) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const disciplinesParams = queryString.stringify({ disciplines: disciplinesSelected.map(item => item.id) });
  const topicsParams = queryString.stringify({ topics: topicsSelected.map(item => item.id) });


  const url = `/topics/related_topics/?${disciplinesParams}&${topicsParams}`;
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
