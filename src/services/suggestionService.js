import { apiUrl } from 'helpers/config';
// import queryString from 'query-string';
import axios from 'axios';
import { authHeader } from 'helpers';
import queryString from 'query-string';

let call;

function listTopicSuggestions(term, topicsSelected, disciplinesSelected) {
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

  const disciplinesParams = disciplinesSelected ? queryString.stringify({ disciplines: disciplinesSelected.map(item => item.id) }) : '';
  const topicsParams = topicsSelected ? queryString.stringify({ topics: topicsSelected.map(item => item.id) }) : '';

  const url = `/synonym_autocomplete/?q=${term}&${disciplinesParams}&${topicsParams}`;
  return axios.get(`${apiUrl}${url}`, requestOptions)
    .then(response => response.data).then(topicSuggestions => topicSuggestions);
}

const suggestionService = {
  listTopicSuggestions,
};

export default suggestionService;
