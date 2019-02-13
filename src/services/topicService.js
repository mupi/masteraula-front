import { apiUrl } from 'helpers/config';

// Get all disciplines that will be used in SideBar
function listTopics(param) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }

    return data;
  });

  return fetch(`${apiUrl}/topics/`, requestOptions)
    .then(handleResponse)
    .then(topics => topics);
}


const topicService = {
  listTopics,
};

export default topicService;
