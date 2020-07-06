import { apiUrl } from 'helpers/config';
// import queryString from 'query-string';
import axios from 'axios';
import { authHeader } from 'helpers';

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
  fetchActivity,
  createActivity,
  updateActivity,
  deleteActivity,
};

export default activityService;
