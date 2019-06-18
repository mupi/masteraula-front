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

function listLearningObject(page, filterObject) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const search = (filterObject && filterObject.searchTextObject) ? queryString.stringify({ text: filterObject.searchTextObject }) : null;
  const isImage = (filterObject && filterObject.typesObjectSelected.filter(item => item.id === 'I').length > 0) ? queryString.stringify({ is_image: 'true' }) : null;
  const isText = (filterObject && filterObject.typesObjectSelected.filter(item => item.id === 'T')).length > 0 ? queryString.stringify({ is_text: 'true' }) : null;

  const url = (search)
    ? `/learning_object/search/?page=${page}&${search}&${isImage}&${isText}`
    : `/learning_object/?page=${page}&${isImage}&${isText}`;


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
