import { apiUrl } from 'helpers/config';

function logout() {
  localStorage.removeItem('session');
}

export const handleResponse = response => response.json().then((data) => {
  if (!response.ok) {
    if (response.status === 401) {
      logout();
    }
    if (data && data.non_field_errors) {
      if (data.non_field_errors[0] === 'E-mail is not verified.') {
        return Promise.reject('Seu cadastro ainda não foi confirmado. Para enviar um novo email de confirmação, clique aqui.');
      } if (data.non_field_errors[0] === 'Impossível fazer login com as credenciais fornecidas.') {
        return Promise.reject('Usuário e/ou senha inválido(s)');
      }
    }
    const error = (data && data.non_field_errors) || response.statusText;
    return Promise.reject(error);
  }

  return data;
});

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${apiUrl}/auth/login/ `, requestOptions)
    .then(
      handleResponse,
      error => Promise.reject('Problemas de conexão com o banco de dados'),
    )
    .then(
      (session) => {
        if (session.token) {
          localStorage.setItem('session', JSON.stringify(session));
        }

        return session;
      },
    );
}


const loginService = {
  login,
  logout,
};

export default loginService;
