import { apiUrl } from 'helpers/config';

const filterService = {
  listDisciplineFilters,
  listTeachingLevelFilters,
};

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

export default filterService;
