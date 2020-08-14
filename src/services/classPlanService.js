import {
  apiUrl,
} from 'helpers/config';
// import queryString from 'query-string';
import axios from 'axios';
import {
  authHeader,
} from 'helpers';

import queryString from 'query-string';


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

// Fetch a public class plan given its ID
function fetchPublicClassPlan(link) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },

  };

  const url = `/class_plan_publication/${link}/`;


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
    } else if (name === 'bncc_ids') {
      classPlan[name].forEach((BnccId, index) => {
        formData.append(`bncc_ids[${index}]`, BnccId);
      });
    } else if (name === 'tags') {
      const arr = [];
      classPlan[name].forEach((tag) => {
        arr.push(`"${tag}"`);
      });
      formData.append('tags', `[${arr}]`);
    } else if (name === 'documents_ids') {
      classPlan[name].forEach((documentId, index) => {
        formData.append(`documents_ids[${index}]`, documentId);
      });
    } else if (name === 'activities_ids') {
      classPlan[name].forEach((activityId, index) => {
        formData.append(`activities_ids[${index}]`, activityId);
      });
    } else if (name === 'documents_online_ids') {
      classPlan[name].forEach((documentOnlineId, index) => {
        formData.append(`documents_online_ids[${index}]`, documentOnlineId);
      });
    } else if (name === 'stations') {
      classPlan[name].forEach((station, index) => {
        formData.append(`stations[${index}]description_station`, station.description_station);
        formData.append(`stations[${index}]name_station`, station.name_station);
        if (station.document_ids) { formData.append(`stations[${index}]document_ids`, station.document_ids); }

        if (station.activity_ids) { formData.append(`stations[${index}]activity_ids`, station.activity_ids); }

        if (station.document_online_ids) { formData.append(`stations[${index}]document_online_ids`, station.document_online_ids); }
      });
    } else formData.append(name, classPlan[name]);
  });

  return formData;
}

function convertEditClassPlanToFormData(classPlan) {
  const formData = new FormData();
  const arr = [];
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
    } else if (name === 'bncc_ids') {
      classPlan[name].forEach((bnccId) => {
        formData.append('bncc_ids', bnccId);
      });
    } else if (name === 'tags') {
      classPlan[name].forEach((tag) => {
        arr.push(`"${tag}"`);
      });
      formData.append('tags', `[${arr}]`);
    } else if (name === 'documents_ids') {
      classPlan[name].forEach((documentId) => {
        formData.append('documents_ids', documentId);
      });
    } else if (name === 'activities_ids') {
      classPlan[name].forEach((activityId) => {
        formData.append('activities_ids', activityId);
      });
    } else if (name === 'documents_online_ids') {
      classPlan[name].forEach((documentOnlineId) => {
        formData.append('documents_online_ids', documentOnlineId);
      });
    } else if (name === 'stations') {
      classPlan[name].forEach((station, index) => {
        formData.append(`stations[${index}]description_station`, station.description_station);
        formData.append(`stations[${index}]name_station`, station.name_station);
        if (station.document_ids) { formData.append(`stations[${index}]document_ids`, station.document_ids); }

        if (station.activity_ids) { formData.append(`stations[${index}]activity_ids`, station.activity_ids); }

        if (station.document_online_ids) { formData.append(`stations[${index}]document_online_ids`, station.document_online_ids); }
      });
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

// Copy a class plan given its ID

function copyClassPlan(idClassPlan) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data || 'Something went wrong');
      return Promise.reject(error);
    }

    return data;
  });

  const url = `/class_plans/${idClassPlan}/copy_plan/`;

  return fetch(`${apiUrl}${url}`, requestOptions)
    .then(handleResponse)
    .then(activeClassPlan => activeClassPlan);
}

// Generate a publick link
function generatePublicLink(id) {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: authHeader(),
    },
  };
  return axios.get(`${apiUrl}/class_plans/${id}/generate_link/`, requestOptions)
    .then(response => response.data).then(link => link);
}

function listClassPlans(page, filter) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };
  const pageParam = queryString.stringify({ page });

  const disciplinesPL = filter.disciplinesSelected.filter(discipline => discipline.id === 2);
  const disciplinesSF = filter.disciplinesSelected.filter(discipline => discipline.id === 11);
  let disciplines = filter.disciplinesSelected;

  if (disciplinesPL.length > 0) disciplines = [...disciplinesPL, { id: 3, name: 'Literatura' }];
  if (disciplinesSF.length > 0) disciplines = [...disciplinesSF, { id: 12, name: 'Filosofia' }];


  const disciplinesParams = queryString.stringify({ disciplines: disciplines.map(item => item.id) });
  const teachingLevelParams = queryString.stringify({ teaching_levels: filter.teachingLevelsSelected.map(item => item.id) });
  const difficultiesParams = queryString.stringify({ difficulties: filter.difficultiesSelected.map(item => item.id) });
  const yearsParams = queryString.stringify({ years: filter.yearsSelected.map(item => item.name) });
  const topicsParams = queryString.stringify({ topics: filter.topicsSelected.map(item => item.id) });

  const search = (filter.searchText) ? queryString.stringify({ text: filter.searchText }) : null;
  // const author = (filter.onlyMyClassPlans) ? queryString.stringify({ author: filter.author }) : '';

  const urlParams = [pageParam, disciplinesParams, teachingLevelParams, difficultiesParams, yearsParams, topicsParams, search]
    .filter(p => p)
    .join('&');

  const url = (search)
    ? `/class_plans/search/?${urlParams}`
    : `/class_plans/?${urlParams}`;

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }

    return data;
  });

  return fetch(`${apiUrl}${url}`, requestOptions)
    .then(handleResponse)
    .then(classPlanPage => classPlanPage);
}

function getNumberClassPlanPublicLinks() {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: authHeader(),
    },
  };
  return axios.get(`${apiUrl}/generate_link/`, requestOptions)
    .then(response => response.data).then(numberClassPlanPublicLinks => numberClassPlanPublicLinks);
}

const classPlanService = {
  fetchClassPlan,
  fetchPublicClassPlan,
  listMyClassPlans,
  createClassPlan,
  updateClassPlan,
  deleteClassPlan,
  copyClassPlan,
  generatePublicLink,
  listClassPlans,
  getNumberClassPlanPublicLinks,
};

export default classPlanService;
