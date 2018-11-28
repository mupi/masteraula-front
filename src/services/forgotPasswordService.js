import { apiUrl } from 'helpers/config';

function sendForgotPasswordEmail(email) {

  function handleResponse(response) {
    return response.json().then((data) => {
      if (!response.ok) {
        const error = (data && data.error) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  };

  return fetch(`${apiUrl}/auth/password/reset/ `, requestOptions)
    .then(handleResponse)
    .then(confirmation => confirmation);
}

function resetForgotPassword(new_password1, new_password2, uid, token) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      new_password1, new_password2, uid, token,
    }),
  };

  function handleResponse(response) {
    return response.json().then((data) => {
      if (!response.ok) {
        const error = (data && data.error) || response.statusText;
        return Promise.reject('A URL para redefinição de senha é inválida ou expirou');
      }

      return data;
    });
  }

  return fetch(`${apiUrl}/auth/password/reset/confirm/`, requestOptions)
    .then(handleResponse)
    .then(confirmation => confirmation);
}

const forgotPasswordService = {
  sendForgotPasswordEmail,
  resetForgotPassword,
};

export default forgotPasswordService;
