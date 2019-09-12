import { apiUrl } from 'helpers/config';
import queryString from 'query-string';

let currentAbort = new AbortController();

// Get all disciplines that will be used in SideBar
function listTopics(disciplines) {
  currentAbort.abort();
  currentAbort = new AbortController();

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    signal: currentAbort.signal,
  };

  let disciplinesParams = '';
  if (disciplines) { disciplinesParams = queryString.stringify({ disciplines: disciplines.map(item => item.id) }); }


  const url = `/topics/?${disciplinesParams}`;

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }

    return data;
  });

  return fetch(`${apiUrl}${url}`, requestOptions)
    .then(handleResponse)
    .then(topics => topics);
}


const topicService = {
  listTopics,
};

export default topicService;
