import { apiUrl } from 'helpers/config';
import queryString from 'query-string';
import axios from 'axios';
import { authHeader } from 'helpers';

// let call;

/* function listTopics(disciplines) {
  if (call) call.cancel();

  call = axios.CancelToken.source();

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cancelToken: call.token,
  };

  let disciplinesParams = '';
  if (disciplines) { disciplinesParams = queryString.stringify({ disciplines: disciplines.map(item => item.id) }); }

  const url = `/topics/?${disciplinesParams}`;

  return axios.get(`${apiUrl}${url}`, requestOptions).then(response => response.data);
} */


function listTopics(disciplineIdSelected, page, orderField, order) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  let disciplines = [{ id: disciplineIdSelected }];
  let disciplinesParams = '';

  if (disciplineIdSelected > 0) {
    if (disciplineIdSelected === 2) disciplines = [{ id: disciplineIdSelected }, { id: 3, name: 'Literatura' }];
    if (disciplineIdSelected === 11) disciplines = [{ id: disciplineIdSelected }, { id: 12, name: 'Filosofia' }];
    disciplinesParams = queryString.stringify({ disciplines: disciplines.map(item => item.id) });
  }

  const pageParam = queryString.stringify({ page });
  const orderFieldParam = queryString.stringify({ order_field: orderField });
  const orderParam = queryString.stringify({ order });

  const urlParams = [disciplinesParams, pageParam, orderFieldParam, orderParam]
    .filter(p => p)
    .join('&');

  const url = `/topics/?${urlParams}`;

  console.log(url);
  return axios.get(`${apiUrl}${url}`, requestOptions)
    .then(response => response.data).then(topics => topics);
}

const topicService = {
  listTopics,
};

export default topicService;
