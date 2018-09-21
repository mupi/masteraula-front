import { apiUrl } from 'helpers/config';


export const handleResponse = response => response.json().then((data) => {
  if (!response.ok) {
    const error = (data && data.email);
    return Promise.reject(error);
  }

  return data;
});

function register(email, password, name) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: email,
      email,
      password1: password,
      password2: password,
      name,
    }),
  };

  return fetch(`${apiUrl}/auth/registration/`, requestOptions)
    .then(handleResponse)
    .then(detail => detail);
}

function verifyEmail(key) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      key,
    }),
  };

  return fetch(`${apiUrl}/auth/registration/verify-email/`, requestOptions)
    .then(handleResponse)
    .then(detail => detail);
}

function resendEmail(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: email,
      email,
      password,
    }),
  };

  return fetch(`${apiUrl}/resend_confirmation_email`, requestOptions)
    .then(handleResponse)
    .then(detail => detail);
}

const registerService = {
  register,
  verifyEmail,
  resendEmail,
};
export default registerService;
