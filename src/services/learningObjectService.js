import { apiUrl } from 'helpers/config';
import { authHeader } from 'helpers';

// Update an Active LearningObject
function updateLearningObject(activeUpdateLearningObject) {
  const requestOptions = {
    method: 'PUT',
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

const learningObjectService = {
  updateLearningObject,
};

export default learningObjectService;
