import { apiUrl } from 'helpers/config';
import queryString from 'query-string';
import axios from 'axios';
import { authHeader } from 'helpers';

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
  const disciplineIdInt = parseInt(disciplineIdSelected, 10);

  if (disciplineIdInt > 0) {
    if (disciplineIdInt === 2) disciplines = [{ id: disciplineIdSelected }, { id: 3, name: 'Literatura' }];
    if (disciplineIdInt === 11) disciplines = [{ id: disciplineIdSelected }, { id: 12, name: 'Filosofia' }];
    disciplinesParams = queryString.stringify({ disciplines: disciplines.map(item => item.id) });
  }

  const pageParam = queryString.stringify({ page });
  const orderFieldParam = queryString.stringify({ order_field: orderField });
  const orderParam = queryString.stringify({ order });

  const urlParams = [disciplinesParams, pageParam, orderFieldParam, orderParam]
    .filter(p => p)
    .join('&');

  const url = `/topics/?${urlParams}`;

  return axios.get(`${apiUrl}${url}`, requestOptions)
    .then(response => response.data).then(topics => topics);
}

const topicService = {
  listTopics,
};

export default topicService;
