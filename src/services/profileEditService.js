import { authHeader } from 'helpers';
import { apiUrl } from 'helpers/config';

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
  }

  return data;
});

const handleProfileResponse = response => response.json().then((data) => {
  if (!response.ok) {
    if (data.profile_pic) {
      if (data.profile_pic[0].includes('Max')) return Promise.reject('O tamanho máximo da imagem é 1MB');
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
function getStatesList() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${apiUrl}/states/`, requestOptions)
    .then(handleResponse)
    .then(stateList => stateList);
}

// Get cities of state id
function getCitiesList(idState) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${apiUrl}/cities/?uf=${idState}`, requestOptions)
    .then(handleResponse)
    .then(cityList => cityList);
}

function profilePasswordEdit(profile) {
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
}

function profileEdit(profile) {
  const formData = new FormData();
  Object.keys(profile).forEach((name) => {
    if (name === 'profile_pic') {
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
}

const profileEditService = {
  profileEdit,
  profilePasswordEdit,
  getStatesList,
  getCitiesList,
};

export default profileEditService;
