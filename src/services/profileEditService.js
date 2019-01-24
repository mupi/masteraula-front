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
    return Promise.reject('DIFFERENT_OLD_PASSWORD');
  }

  return data;
});

const handleProfileResponse = response => response.json().then((data) => {
  if (!response.ok) {
    if (data.profile_pic) return Promise.reject('O tamanho máximo da imagem é 1MB');
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

  if (profile.old_password) {
    return Promise.all([fetchPassword]);
  }
}

function profileEdit(profile) {
  const formData = new FormData();
  for (const name in profile) {
    if (name === 'profile_pic') formData.append(name, profile[name][0]);
    else formData.append(name, profile[name]);
  }
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
