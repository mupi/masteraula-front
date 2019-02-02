import { apiUrl } from 'helpers/config';

// Get all disciplines that will be used in SideBar
function listDisciplineFilters(param) {
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
function listTeachingLevelFilters(param) {
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
function listSourceFilters(param) {
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
function listYearFilters(param) {
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

const filterService = {
  listDisciplineFilters,
  listTeachingLevelFilters,
  listSourceFilters,
  listYearFilters,
};

export default filterService;
