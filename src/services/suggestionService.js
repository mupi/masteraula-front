import { apiUrl } from 'helpers/config';
// import queryString from 'query-string';
import axios from 'axios';
import { authHeader } from 'helpers';
import queryString from 'query-string';

let call;

function listTopicSuggestions(term, filter) {
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

  /*
  const disciplinesParams = disciplinesSelected ? queryString.stringify({ disciplines: disciplinesSelected.map(item => item.id) }) : '';
  const topicsParams = topicsSelected ? queryString.stringify({ topics: topicsSelected.map(item => item.id) }) : '';
  */

  const disciplinesParams = queryString.stringify({ disciplines: filter.disciplinesSelected.map(item => item.id) });
  const teachingLevelParams = queryString.stringify({ teaching_levels: filter.teachingLevelsSelected.map(item => item.id) });
  const difficultiesParams = queryString.stringify({ difficulties: filter.difficultiesSelected.map(item => item.id) });
  const sourcesParams = queryString.stringify({ sources: filter.sourcesSelected.map(item => item.name) });
  const yearsParams = queryString.stringify({ years: filter.yearsSelected.map(item => item.name) });
  const topicsParams = queryString.stringify({ topics: filter.topicsSelected.map(item => item.id) });
  const author = (filter.onlyMyQuestions) ? queryString.stringify({ author: filter.author }) : '';


  const urlParams = [disciplinesParams, teachingLevelParams, difficultiesParams,
    sourcesParams, yearsParams, topicsParams, author]
    .filter(p => p)
    .join('&');

  const url = `/synonym_autocomplete/?q=${term}&${urlParams}`;


  return axios.get(`${apiUrl}${url}`, requestOptions)
    .then(response => response.data).then(topicSuggestions => topicSuggestions);
}

const suggestionService = {
  listTopicSuggestions,
};

export default suggestionService;
