import { apiUrl } from 'helpers/config';
import queryString from 'query-string';
import axios from 'axios';

let call;

// Get all disciplines that will be used in SideBar
function listTopics(disciplines) {
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
}

const topicService = {
  listTopics,
};

export default topicService;
