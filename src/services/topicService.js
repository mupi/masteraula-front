import { apiUrl } from 'helpers/config';
import queryString from 'query-string';

// Get all disciplines that will be used in SideBar
function listTopics(disciplines) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
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
