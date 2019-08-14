import { apiUrl, facebookLoginId, googleLoginId } from 'helpers/config';

const logout = () => {
  localStorage.removeItem('session');
};

const handleResponse = (response) => {
  if (response.status === 404) {
    return Promise.reject('Ocorreu um erro durante sua solicitação.');
  }
  if (response.status === 401) {
    logout();
  }
  return response.json().then((data) => {
    if (!response.ok) {
      if (data && data.non_field_errors) {
        if (data.non_field_errors[0].includes('E-mail ainda não verificado')) {
          return Promise.reject('Seu cadastro ainda não foi confirmado. Para enviar um novo email de confirmação, clique aqui.');
        }
        return Promise.reject(data.non_field_errors[0]);
      }
      //   const error = (data && data.non_field_errors) || response.statusText;
      return Promise.reject(data);
    }

    return data;
  });
};

const login = (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${apiUrl}/auth/login/ `, requestOptions)
    .then(
      handleResponse,
      () => Promise.reject('Problemas de conexão com o banco de dados'),
    )
    .then(
      (session) => {
        if (session.token) {
          localStorage.setItem('session', JSON.stringify(session));
        }

        return session;
      },
    );
};

export const handleSocialResponse = response => response.json().then((data) => {
  if (!response.ok) {
    if (data[Object.keys(data)[0]].includes('Define callback_url in view')) {
      return Promise.reject('Processo de login cancelado');
    }
    return Promise.reject(data[Object.keys(data)[0]]);
  }

  return data;
});

const fetchSocialLogin = (accessToken, code, provider) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token: accessToken, code }),
  };

  return fetch(`${apiUrl}/rest-auth/sign-in/${provider}/`, requestOptions)
    .then(
      handleSocialResponse,
      () => Promise.reject('Problemas de conexão com o banco de dados'),
    )
    .then(
      (session) => {
        if (session.token) {
          localStorage.setItem('session', JSON.stringify(session));
        }
        return session;
      },
    );
};

const loginFacebook = accessToken => fetchSocialLogin(accessToken, facebookLoginId, 'facebook');

const loginGoogle = accessToken => fetchSocialLogin(accessToken, googleLoginId, 'google');

const loginService = {
  login,
  logout,
  loginGoogle,
  loginFacebook,
};

export default loginService;
