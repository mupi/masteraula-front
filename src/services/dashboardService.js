import {
  apiUrl,
} from 'helpers/config';
import axios from 'axios';
import {
  authHeader,
} from 'helpers';

// Fetch all dashboard info
function fetchMyDashboard() {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = '/dashboard/';

  return axios.get(`${apiUrl}${url}`, requestOptions)
    .then(response => response.data).then(myDashboard => myDashboard);
}


const dashboardService = {
  fetchMyDashboard,
};

export default dashboardService;
