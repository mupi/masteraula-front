import { apiUrl } from 'helpers/config';
import { authHeader } from 'helpers';
import queryString from 'query-string';
import axios from 'axios';

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

/* Create a new object */
function createLearningObject(newObjectData) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = '/learning_object/';

  return axios.post(`${apiUrl}${url}`, newObjectData, requestOptions)
    .then(response => response.data).then(newObject => newObject);
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

function listLearningObject(page, filterObject) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const search = (filterObject && filterObject.searchTextObject) ? queryString.stringify({ text: filterObject.searchTextObject }) : null;
  const filters = (filterObject && filterObject.typesObjectSelected.map(item => `filters=${item.id}`).join('&'));

  const url = (search)
    ? `/learning_object/search/?page=${page}&${search}&${filters}`
    : `/learning_object/?page=${page}&${filters}`;


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


function listLearningObjectModal(page, filterObject) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const search = (filterObject && filterObject.searchTextObjectModal) ? queryString.stringify({ text: filterObject.searchTextObjectModal }) : null;

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
  createLearningObject,
  updateLearningObject,
  listLearningObject,
  listLearningObjectModal,
};

export default learningObjectService;
