import { authHeader } from 'helpers';
import { apiUrl, facebookLoginId, googleLoginId } from 'helpers/config';

export const DIFFERENT_OLD_PASSWORD = 'DIFFERENT_OLD_PASSWORD';

const handleResponse = response => response.json().then((data) => {
  if (!response.ok) {
    const error = (data && data.email);
    return Promise.reject(error);
  }

  return data;
});

const handlePasswordResponse = response => response.json().then((data) => {
  if (!response.ok) {
    if (data.old_password) {
      if (data.old_password[0].includes('Invalid password')) return Promise.reject('A senha atual é inválida');
      return Promise.reject(data.old_password[0]);
    }

    if (data.new_password1) {
      return Promise.reject(data.new_password1[0]);
    }

    if (data.new_password2) {
      return Promise.reject(data.new_password2[0]);
    }
  }
  return data;
});

const handleProfileResponse = response => response.json().then((data) => {
  if (!response.ok) {
    if (response.status === 413) {
      return Promise.reject('Tamanho máximo do arquivo é 1Mb');
    }
    if (data.profile_pic) {
      if (data.profile_pic[0].includes('não é um arquivo de imagem')) {
        return Promise.reject('Arquivo inválido. Escolha um arquivo JPG, PNG ou GIF.');
      }
      return Promise.reject(data.profile_pic[0]);
    }
    return Promise.reject(data);
  }

  return data;
});

// Get all states
const getStatesList = () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${apiUrl}/states/`, requestOptions)
    .then(handleResponse)
    .then(stateList => stateList);
};

// Get cities of state id
const getCitiesList = (idState) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${apiUrl}/cities/?uf=${idState}`, requestOptions)
    .then(handleResponse)
    .then(cityList => cityList);
};

const profilePasswordEdit = (profile) => {
  const requestPasswordOption = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
    body: JSON.stringify({
      old_password: profile.old_password,
      new_password1: profile.new_password1,
      new_password2: profile.new_password2,
    }),
  };

  const fetchPassword = fetch(`${apiUrl}/auth/password/change/`, requestPasswordOption)
    .then(handlePasswordResponse)
    .then(detail => detail);

  return Promise.all([fetchPassword]);
};

const profileEdit = (profile) => {
  const formData = new FormData();
  Object.keys(profile).forEach((name) => {
    if (name === 'disciplines') {
      profile[name].forEach((discipline, index) => {
        formData.append(`disciplines[${index}]`, discipline);
      });
    } else if (name === 'profile_pic') {
      if (profile[name]) { formData.append(name, profile[name][0]); }
    } else formData.append(name, profile[name]);
  });

  const requestOptions = {
    method: 'PATCH',
    headers: {
      Authorization: authHeader(),
    },
    body: formData,
  };

  const fetchProfile = fetch(`${apiUrl}/auth/user/ `, requestOptions)
    .then(handleProfileResponse)
    .then(detail => detail);

  return Promise.all([fetchProfile]);
};

const fetchSocialConnect = (accessToken, code, provider) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ access_token: accessToken, code }),
  };

  return fetch(`${apiUrl}/rest-auth/connect/${provider}/`, requestOptions)
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

const connectFacebook = accessToken => fetchSocialConnect(accessToken, facebookLoginId, 'facebook');

const connectGoogle = accessToken => fetchSocialConnect(accessToken, googleLoginId, 'google');

// Disconnect from social accounts
const disconnectSocialAccount = (idSocialAccount) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: authHeader(),
      'Content-Type': 'application/json',
    },
  };

  return fetch(`${apiUrl}/socialaccounts/${idSocialAccount}/disconnect/`, requestOptions)
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

const profileEditService = {
  profileEdit,
  profilePasswordEdit,
  getStatesList,
  getCitiesList,
  connectFacebook,
  connectGoogle,
  disconnectSocialAccount,
};

export default profileEditService;
