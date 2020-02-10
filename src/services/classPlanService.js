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
  const formData = new FormData();
  Object.keys(newClassPlanData).forEach((name) => {
    if (name === 'disciplines_ids') {
      newClassPlanData[name].forEach((disciplineId, index) => {
        formData.append(`disciplines_ids[${index}]`, disciplineId);
      });
    } else if (name === 'teaching_levels_ids') {
      newClassPlanData[name].forEach((teachingLevelId, index) => {
        formData.append(`teaching_levels_ids[${index}]`, teachingLevelId);
      });
    } else if (name === 'teaching_years_ids') {
      newClassPlanData[name].forEach((teachingYearId, index) => {
        formData.append(`teaching_years_ids[${index}]`, teachingYearId);
      });
    } else if (name === 'topics_ids') {
      newClassPlanData[name].forEach((topicId, index) => {
        formData.append(`topics_ids[${index}]`, topicId);
      });
    } else if (name === 'learning_objects_ids') {
      newClassPlanData[name].forEach((objectId, index) => {
        formData.append(`learning_objects_ids[${index}]`, objectId);
      });
    } else if (name === 'documents_ids') {
      newClassPlanData[name].forEach((documentId, index) => {
        formData.append(`documents_ids[${index}]`, documentId);
      });
    } else if (name === 'pdf') {
      if (newClassPlanData[name]) { formData.append(name, newClassPlanData[name][0]); }
    } else formData.append(name, newClassPlanData[name]);
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = '/class_plans/';

  return axios.post(`${apiUrl}${url}`, formData, requestOptions)
    .then(response => response.data).then(newClassPlan => newClassPlan);
}

/* Update a new class Plan */
function updateClassPlan(activeClassPlan) {
  const formData = new FormData();
  Object.keys(activeClassPlan).forEach((name) => {
    if (name === 'disciplines_ids') {
      activeClassPlan[name].forEach((disciplineId, index) => {
        formData.append(`disciplines_ids[${index}]`, disciplineId);
      });
    } else if (name === 'teaching_levels_ids') {
      activeClassPlan[name].forEach((teachingLevelId, index) => {
        formData.append(`teaching_levels_ids[${index}]`, teachingLevelId);
      });
    } else if (name === 'teaching_years_ids') {
      activeClassPlan[name].forEach((teachingYearId, index) => {
        formData.append(`teaching_years_ids[${index}]`, teachingYearId);
      });
    } else if (name === 'topics_ids') {
      activeClassPlan[name].forEach((topicId, index) => {
        formData.append(`topics_ids[${index}]`, topicId);
      });
    } else if (name === 'learning_objects_ids') {
      activeClassPlan[name].forEach((objectId, index) => {
        formData.append(`learning_objects_ids[${index}]`, objectId);
      });
    } else if (name === 'documents_ids') {
      activeClassPlan[name].forEach((documentId, index) => {
        formData.append(`documents_ids[${index}]`, documentId);
      });
    } else if (name === 'pdf') {
      if (activeClassPlan[name]) { formData.append(name, activeClassPlan[name][0]); }
    } else formData.append(name, activeClassPlan[name]);
  });

  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = `/class_plans/${activeClassPlan.id}/`;

  return axios.patch(`${apiUrl}${url}`, formData, requestOptions)
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
