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

function convertObjectToFormData(objectData) {
  const formData = new FormData();
  Object.keys(objectData).forEach((name) => {
    if (name === 'tags') {
      objectData[name].forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
    } else if (name === 'object_types') {
      objectData[name].forEach((objectType, index) => {
        formData.append(`objectType[${index}]`, objectType);
      });
    } else if (name === 'image') {
      if (objectData[name]) { formData.append(name, objectData[name][0]); }
    } else formData.append(name, objectData[name]);
  });

  return formData;
}
/* Create a new object */
function createLearningObject(newObjectData) {
  const objectFormData = convertObjectToFormData(newObjectData);
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = '/learning_object/';

  return axios.post(`${apiUrl}${url}`, objectFormData, requestOptions)
    .then(response => response.data).then(newObject => newObject)
    .catch((error) => {
      if (error.response) {
        if (error.response.data.image[0].includes('File is not Image')) {
          return Promise.reject('Arquivo inválido. Escolha um arquivo PNG, JPG ou JPEG.');
        }
        if (error.response.data.image[0].includes('Max file size is 2MB')) {
          return Promise.reject('Tamanho máximo do arquivo é 2Mb.');
        }
        return Promise.reject(error.response.data.pdf[0]);
      }

      return Promise.reject('Ocorreu um erro com sua solicitação');
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
// Delete an object given its ID
function deleteLearningObject(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: authHeader(),
    },
  };

  return axios.delete(`${apiUrl}/learning_object/${id}/`, requestOptions)
    .then(response => response.data).then(() => id);
}

const learningObjectService = {
  fetchLearningObject,
  createLearningObject,
  updateLearningObject,
  listLearningObject,
  listLearningObjectModal,
  deleteLearningObject,
};

export default learningObjectService;
