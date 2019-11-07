// import { apiUrl } from 'helpers/config';
// import queryString from 'query-string';
import axios from 'axios';

let call;

function listTopicSuggestions(term) {
  if (call) call.cancel();

  call = axios.CancelToken.source();

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cancelToken: call.token,
  };

  return axios.get(`https://swapi.co/api/people/?search=${term}`, requestOptions)
    .then(response => response.data).then(topicSuggestions => topicSuggestions);
}

const suggestionService = {
  listTopicSuggestions,
};

export default suggestionService;
