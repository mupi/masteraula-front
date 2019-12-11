import { apiUrl } from 'helpers/config';
// import queryString from 'query-string';
import axios from 'axios';
import { authHeader } from 'helpers';

let call;

function listMyQuestionLabels() {
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

  const url = '/labels/';


  return axios.get(`${apiUrl}${url}`, requestOptions)
    .then(response => response.data).then(myQuestionLabels => myQuestionLabels);
}

const labelService = {
  listMyQuestionLabels,
};

export default labelService;
