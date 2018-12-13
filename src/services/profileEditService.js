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

// Get all states
function getStatesList(param) {
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
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
    body: JSON.stringify({
      name: profile.name,
      about: profile.about,
      city: profile.city,
    }),
  };
  
  const fetchProfile = fetch(`${apiUrl}/auth/user/ `, requestOptions)
    .then(handleResponse)
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
