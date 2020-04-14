import {
  apiUrl,
} from 'helpers/config';
import axios from 'axios';
import {
  authHeader,
} from 'helpers';


// Fetch a class plan given its ID
function fetchOnlineTest(id) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },

  };

  const url = `/class_plans/${id}/`;


  return axios.get(`${apiUrl}${url}`, requestOptions)
    .then(response => response.data).then(activeClassPlan => activeClassPlan);
}


const onlineTestService = {
  fetchOnlineTest,
  /* listMyOnlineTest,
  createOnlineTest,
  updateOnlineTest,
  deleteOnlineTest,
  copyOnlineTest, */
};

export default onlineTestService;
