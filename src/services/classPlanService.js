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

/* function buildFormData(formData, data, parentKey) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && (parentKey !== 'pdf')) {
    Object.keys(data).forEach((key) => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
}

function jsonToFormData(data) {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
} */

function convertClassPlanToFormData(classPlan) {
  const formData = new FormData();
  Object.keys(classPlan).forEach((name) => {
    if (name === 'disciplines_ids') {
      classPlan[name].forEach((disciplineId, index) => {
        formData.append(`disciplines_ids[${index}]`, disciplineId);
      });
    } else if (name === 'teaching_levels_ids') {
      classPlan[name].forEach((teachingLevelId, index) => {
        formData.append(`teaching_levels_ids[${index}]`, teachingLevelId);
      });
    } else if (name === 'teaching_years_ids') {
      classPlan[name].forEach((teachingYearId, index) => {
        formData.append(`teaching_years_ids[${index}]`, teachingYearId);
      });
    } else if (name === 'topics_ids') {
      classPlan[name].forEach((topicId, index) => {
        formData.append(`topics_ids[${index}]`, topicId);
      });
    } else if (name === 'learning_objects_ids') {
      classPlan[name].forEach((objectId, index) => {
        formData.append(`learning_objects_ids[${index}]`, objectId);
      });
    } else if (name === 'documents_ids') {
      classPlan[name].forEach((documentId, index) => {
        formData.append(`documents_ids[${index}]`, documentId);
      });
    } else if (name === 'links') {
      classPlan[name].forEach((link, index) => {
        formData.append(`links[${index}]link`, link.link);
        formData.append(`links[${index}]description_url`, link.description_url);
      });
    } else if (name === 'pdf') {
      if (classPlan[name]) { formData.append(name, classPlan[name][0]); }
    } else formData.append(name, classPlan[name]);
  });

  return formData;
}

function convertEditClassPlanToFormData(classPlan) {
  const formData = new FormData();
  Object.keys(classPlan).forEach((name) => {
    if (name === 'disciplines_ids') {
      classPlan[name].forEach((disciplineId) => {
        formData.append('disciplines_ids', disciplineId);
      });
    } else if (name === 'teaching_levels_ids') {
      classPlan[name].forEach((teachingLevelId) => {
        formData.append('teaching_levels_ids', teachingLevelId);
      });
    } else if (name === 'teaching_years_ids') {
      classPlan[name].forEach((teachingYearId) => {
        formData.append('teaching_years_ids', teachingYearId);
      });
    } else if (name === 'topics_ids') {
      classPlan[name].forEach((topicId) => {
        formData.append('topics_ids', topicId);
      });
    } else if (name === 'learning_objects_ids') {
      classPlan[name].forEach((objectId) => {
        formData.append('learning_objects_ids', objectId);
      });
    } else if (name === 'documents_ids') {
      classPlan[name].forEach((documentId) => {
        formData.append('documents_ids', documentId);
      });
    } else if (name === 'links') {
      classPlan[name].forEach((link, index) => {
        formData.append(`links[${index}]link`, link.link);
        formData.append(`links[${index}]description_url`, link.description_url);
      });
    } else if (name === 'pdf') {
      if (classPlan[name]) { formData.append(name, classPlan[name][0]); }
    } else formData.append(name, classPlan[name]);
  });

  return formData;
}
/* Create a new class Plan */
function createClassPlan(newClassPlanData) {
  // const classPlanFormData = jsonToFormData(newClassPlanData);

  const classPlanFormData = convertClassPlanToFormData(newClassPlanData);
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = '/class_plans/';

  return axios.post(`${apiUrl}${url}`, classPlanFormData, requestOptions)
    .then(response => response.data).then(newClassPlan => newClassPlan)
    .catch((error) => {
      if (error.response) {
        if (error.response.data.pdf[0].includes('File is not PDF')) {
          return Promise.reject('Arquivo inválido. Escolha um arquivo PDF.');
        }
        if (error.response.data.pdf[0].includes('Max file size is 2MB')) {
          return Promise.reject('Tamanho máximo do arquivo é 2Mb.');
        }
        return Promise.reject(error.response.data.pdf[0]);
      }

      return Promise.reject('Ocorreu um erro com sua solicitação');
    });
}

/* Update a new class Plan */
function updateClassPlan(activeClassPlan) {
  const classPlanFormData = convertEditClassPlanToFormData(activeClassPlan);
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = `/class_plans/${activeClassPlan.id}/`;

  return axios.patch(`${apiUrl}${url}`, classPlanFormData, requestOptions)
    .then(response => response.data).then(newMyClassPlan => newMyClassPlan)
    .catch((error) => {
      if (error.response) {
        if (error.response.data.pdf[0].includes('File is not PDF')) {
          return Promise.reject('Arquivo inválido. Escolha um arquivo PDF.');
        }
        if (error.response.data.pdf[0].includes('Max file size is 2MB')) {
          return Promise.reject('Tamanho máximo do arquivo é 2Mb.');
        }
        return Promise.reject(error.response.data.pdf[0]);
      }

      return Promise.reject(error.response.data);
    });
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
