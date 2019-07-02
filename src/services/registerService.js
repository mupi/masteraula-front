import { apiUrl, facebookLoginId, googleLoginId } from 'helpers/config';


export const handleResponse = (response) => {
  if (response.status === 404) {
    return Promise.reject('Ocorreu um erro durante sua solicitação.');
  }
  return response.json().then((data) => {
    if (!response.ok) {
      /* temporary solution shows only first error */
      if (data.email) {
        if (data.email[0].includes('Um usuário já foi registado com este endereço de e-mail')) {
          return Promise.reject('Um usuário já foi registrado com este endereço de e-mail.');
        }
        return Promise.reject(data.email[0]);
      }
      return Promise.reject(data[Object.keys(data)[0]]);
    }

    return data;
  });
};

function register(email, password, name, acceptTerms) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: email,
      email,
      password1: password,
      password2: password,
      name,
      terms_use: acceptTerms,
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

const fetchSocialRegister = (accessToken, code, provider) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token: accessToken, code }),
  };

  return fetch(`${apiUrl}/rest-auth/sign-up/${provider}/`, requestOptions)
    .then(
      handleResponse,
      () => Promise.reject('Problemas de conexão com o banco de dados'),
    )
    .then(
      session => session,
    );
};

const registerFacebook = accessToken => fetchSocialRegister(accessToken, facebookLoginId, 'facebook');

const registerGoogle = accessToken => fetchSocialRegister(accessToken, googleLoginId, 'google');


const registerService = {
  register,
  verifyEmail,
  resendEmail,
  registerFacebook,
  registerGoogle,
};
export default registerService;
