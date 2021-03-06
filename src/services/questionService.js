import { apiUrl } from 'helpers/config';
import { authHeader } from 'helpers';
import queryString from 'query-string';

function fetchQuestion(id) {
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

  return fetch(`${apiUrl}/questions/${id}/`, requestOptions)
    .then(handleResponse)
    .then(activeQuestion => activeQuestion);
}


// Create a Question
function createQuestion(newQuestionData) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
    body: JSON.stringify({ ...newQuestionData }),
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }
    return data;
  });

  return fetch(`${apiUrl}/questions/`, requestOptions)
    .then(handleResponse)
    .then(activeQuestion => activeQuestion);
}

// Classify a Question
function classifyQuestion(activeUpdateQuestion) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
    body: JSON.stringify({ ...activeUpdateQuestion }),
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data || 'Something went wrong');
      return Promise.reject(error);
    }

    return data;
  });

  const idQuestion = activeUpdateQuestion.id;

  return fetch(`${apiUrl}/questions/${idQuestion}/`, requestOptions)
    .then(handleResponse)
    .then((activeQuestion) => {
      localStorage.setItem('activeQuestion', JSON.stringify(activeQuestion));
      return activeQuestion;
    });
}

// Update a Question - available for user's questions only
function updateQuestion(activeUpdateQuestion) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
    body: JSON.stringify({ ...activeUpdateQuestion }),
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data || 'Something went wrong');
      return Promise.reject(error);
    }

    return data;
  });

  const idQuestion = parseInt(activeUpdateQuestion.id, 10);


  return fetch(`${apiUrl}/questions/${idQuestion}/`, requestOptions)
    .then(handleResponse)
    .then((activeQuestion) => {
      localStorage.setItem('activeQuestion', JSON.stringify(activeQuestion));
      return activeQuestion;
    });
}


function listQuestions(page, filter) {
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
  const sourcesParams = queryString.stringify({ sources: filter.sourcesSelected.map(item => item.name) });
  const yearsParams = queryString.stringify({ years: filter.yearsSelected.map(item => item.name) });
  const topicsParams = queryString.stringify({ topics: filter.topicsSelected.map(item => item.id) });
  const myQuestionLabelsParams = queryString.stringify({ labels: filter.myQuestionlabelsSelected.map(item => item.id) });


  const search = (filter.searchText) ? queryString.stringify({ text: filter.searchText }) : null;
  const author = (filter.onlyMyQuestions) ? queryString.stringify({ author: filter.author }) : '';

  const urlParams = [pageParam, disciplinesParams, teachingLevelParams, difficultiesParams,
    sourcesParams, yearsParams, topicsParams, myQuestionLabelsParams, author, search]
    .filter(p => p)
    .join('&');

  const url = (search)
    ? `/questions/search/?${urlParams}`
    : `/questions/?${urlParams}`;

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }

    return data;
  });

  return fetch(`${apiUrl}${url}`, requestOptions)
    .then(handleResponse)
    .then(questionPage => questionPage);
}

function listQuestionModal(page, filter) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };
  const pageParam = queryString.stringify({ page });
  const search = (filter && filter.searchTextModal) ? queryString.stringify({ text: filter.searchTextModal }) : null;
  const author = (filter && filter.onlyMyQuestionsModal) ? queryString.stringify({ author: filter.author }) : '';

  const urlParams = [pageParam, search, author]
    .filter(p => p)
    .join('&');


  const url = (search)
    ? `/questions/search/?${urlParams}`
    : `/questions/?${urlParams}`;


  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }
    return data;
  });

  return fetch(`${apiUrl}${url}`, requestOptions)
    .then(handleResponse)
    .then(questionPage => questionPage);
}

// Question rating
function rateQuestion() {

}

// Delete a question given its ID
function deleteQuestion(idQuestion) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: authHeader(),
    },
  };

  const handleResponse = (response) => {
    if (!response.ok) {
      return Promise.reject();
    }

    return idQuestion;
  };

  return fetch(`${apiUrl}/questions/${idQuestion}/`, requestOptions)
    .then(handleResponse)
    .then(idRemovedHeader => idRemovedHeader);
}

// Copy a question given its ID
function copyQuestion(id) {
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

  const url = `/questions/${id}/copy_question/`;

  return fetch(`${apiUrl}${url}`, requestOptions)
    .then(handleResponse)
    .then(activeClassPlan => activeClassPlan);
}

const questionService = {
  rateQuestion,
  fetchQuestion,
  listQuestions,
  createQuestion,
  classifyQuestion,
  updateQuestion,
  deleteQuestion,
  listQuestionModal,
  copyQuestion,
};

export default questionService;
