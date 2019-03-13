import { apiUrl } from 'helpers/config';


export const handleResponse = response => response.json().then((data) => {
  if (!response.ok) {
    /* temporary solution shows only first error */
    if (data.email) {
      if (data.email[0].includes('Um usuário já foi registado com este endereço de e-mail')) {
        return Promise.reject('Um usuário já foi registrado com este endereço de e-mail.');
      }
      return Promise.reject(data.email[0]);
    }
    for (const key in data) return Promise.reject(data[key]);
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
