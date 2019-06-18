import { apiUrl } from 'helpers/config';
import { authHeader } from 'helpers';
import queryString from 'query-string';

// Fetch a LearningObject using ID
function fetchLearningObject(id) {
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

  return fetch(`${apiUrl}/learning_object/${id}/`, requestOptions)
    .then(handleResponse)
    .then((activeLearningObject) => {
      localStorage.setItem('activeLearningObject', JSON.stringify(activeLearningObject));
      return activeLearningObject;
    });
}

// Update an Active LearningObject
function updateLearningObject(activeUpdateLearningObject) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
    body: JSON.stringify({ ...activeUpdateLearningObject, secret: true }),
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data || 'Something went wrong');
      return Promise.reject(error);
    }

    return data;
  });

  const idLearningObject = activeUpdateLearningObject.id;

  return fetch(`${apiUrl}/learning_object/${idLearningObject}/`, requestOptions)
    .then(handleResponse)
    .then((activeLearningObject) => {
      localStorage.setItem('activeLearningObject', JSON.stringify(activeLearningObject));
      return activeLearningObject;
    });
}

function listLearningObject(page = 1, filter) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const search = (filter && filter.searchTextObject) ? queryString.stringify({ text: filter.searchText }) : null;

  const url = (search)
    ? `/learning_object/search/?page=${page}&${search}`
    : `/learning_object/?page=${page}`;


  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }
    return data;
  });

  return fetch(`${apiUrl}${url}`, requestOptions)
    .then(handleResponse)
    .then(objectPage => objectPage);
}

const learningObjectService = {
  fetchLearningObject,
  updateLearningObject,
  listLearningObject,
};

export default learningObjectService;
