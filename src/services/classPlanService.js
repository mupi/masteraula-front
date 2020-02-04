import {
  apiUrl,
} from 'helpers/config';
// import queryString from 'query-string';
import axios from 'axios';
import {
  authHeader,
} from 'helpers';


// Fetch a class plan given its ID
function fetchClassPlan(id) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },

  };

  const url = `/class_plans/${id}/`;


  return axios.get(`${apiUrl}${url}`, requestOptions)
    .then(response => response.data).then(activeClassPlan => activeClassPlan);
}


function listMyClassPlans(page, orderField, order) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },

  };

  const url = '/class_plans/my_plans/';


  return axios.get(`${apiUrl}${url}?page=${page}&order_field=${orderField}&order=${order}`, requestOptions)
    .then(response => response.data).then(classPlans => classPlans);
}

/* Create a new class Plan */
function createClassPlan(newClassPlanData) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = '/class_plans/';

  return axios.post(`${apiUrl}${url}`, newClassPlanData, requestOptions)
    .then(response => response.data).then(newClassPlan => newClassPlan);
}

/* Update a new class Plan */
function updateClassPlan(activeClassPlan) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = `/class_plans/${activeClassPlan.id}/`;

  return axios.patch(`${apiUrl}${url}`, activeClassPlan, requestOptions)
    .then(response => response.data).then(newMyClassPlan => newMyClassPlan);
}


// Delete a class plan given its ID
function deleteClassPlan(idClassPlanRemoved) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: authHeader(),
    },
  };

  return axios.delete(`${apiUrl}/class_plans/${idClassPlanRemoved}/`, requestOptions)
    .then(response => response.data).then(() => idClassPlanRemoved);
}


const classPlanService = {
  fetchClassPlan,
  listMyClassPlans,
  createClassPlan,
  updateClassPlan,
  deleteClassPlan,
};

export default classPlanService;
