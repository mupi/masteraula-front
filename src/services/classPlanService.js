import {
  apiUrl,
} from 'helpers/config';
// import queryString from 'query-string';
import axios from 'axios';
import {
  authHeader,
} from 'helpers';

let call;

// Fetch a class plan given its ID
function fetchClassPlan(id) {
  if (call) call.cancel();

  call = axios.CancelToken.source();

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
    cancelToken: call.token,

  };

  const url = `/class_plans/${id}/`;


  return axios.get(`${apiUrl}${url}`, requestOptions)
    .then(response => response.data).then(activeClassPlan => activeClassPlan);
}


function listClassPlans() {
  if (call) call.cancel();

  call = axios.CancelToken.source();

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
    cancelToken: call.token,

  };

  const url = '/class_plans/';


  return axios.get(`${apiUrl}${url}`, requestOptions)
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
function deleteClassPlan(idClassPlan) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: authHeader(),
    },
  };

  return axios.delete(`${apiUrl}/class_plans/${idClassPlan}/`, requestOptions)
    .then(response => response.data).then(() => idClassPlan);
}


const classPlanService = {
  fetchClassPlan,
  listClassPlans,
  createClassPlan,
  updateClassPlan,
  deleteClassPlan,
};

export default classPlanService;
