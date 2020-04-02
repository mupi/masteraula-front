import { apiUrl } from 'helpers/config';
import axios from 'axios';
import { authHeader } from 'helpers';

/* Create a new label */
function sendMessage(newMessage) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const url = '/contact/';

  return axios.post(`${apiUrl}${url}`, newMessage, requestOptions)
    .then(response => response.data).then(messageRes => messageRes);
}

const contactService = {
  sendMessage,
};

export default contactService;
