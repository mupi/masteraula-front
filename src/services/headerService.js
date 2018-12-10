import { apiUrl } from 'helpers/config';
import { authHeader } from 'helpers';

// Fetch a Header using ID
function fetchHeader(id) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }
    return data;
  });

  return fetch(`${apiUrl}/headers/${id}/`, requestOptions)
    .then(handleResponse)
    .then((activeHeader) => {
      localStorage.setItem('activeHeader', JSON.stringify(activeHeader));
      return activeHeader;
    });
}

// Create a New Header
function createHeader(newHeaderData) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
    body: JSON.stringify({ ...newHeaderData, secret: true }),
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.email);
      return Promise.reject(error);
    }
    return data;
  });

  return fetch(`${apiUrl}/headers/`, requestOptions)
    .then(handleResponse)
    .then((activeHeader) => {
      localStorage.setItem('activeHeader', JSON.stringify(activeHeader));
      return activeHeader;
    });
}

// Update an Active Header
function updateHeader(activeUpdateHeader) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
    body: JSON.stringify({ ...activeUpdateHeader, secret: true }),
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data || 'Something went wrong');
      return Promise.reject(error);
    }

    return data;
  });

  const idHeader = activeUpdateHeader.id;

  return fetch(`${apiUrl}/headers/${idHeader}/`, requestOptions)
    .then(handleResponse)
    .then((activeHeader) => {
      localStorage.setItem('activeHeader', JSON.stringify(activeHeader));
      return activeHeader;
    });
}


function listMyHeaders(page, orderField, order) {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: authHeader(),
    },
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data || 'Something went wrong');
      return Promise.reject(error);
    }

    return data;
  });

  return fetch(`${apiUrl}/headers/my_headers/?page=${page}&order_field=${orderField}&order=${order}`, requestOptions)
    .then(handleResponse)
    .then(activeHeader => activeHeader);
}


function listMyHeadersCombo() {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: authHeader(),
    },
  };

  const handleResponse = response => response.json().then((data) => {
    if (!response.ok) {
      const error = (data || 'Something went wrong');
      return Promise.reject(error);
    }

    return data;
  });

  return fetch(`${apiUrl}/headers/list_headers/`, requestOptions)
    .then(handleResponse)
    .then(activeHeader => activeHeader);
}

// Delete a header given its ID
function deleteHeader(idHeader) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: authHeader(),
    },
  };

  const handleResponse = (response) => {
    if (!response.ok) {
      return Promise.reject();
    }

    return idHeader;
  };

  return fetch(`${apiUrl}/headers/${idHeader}/`, requestOptions)
    .then(handleResponse)
    .then(idRemovedHeader => idRemovedHeader);
}

const headerService = {
  fetchHeader,
  createHeader,
  updateHeader,
  deleteHeader,
  listMyHeaders,
  listMyHeadersCombo,
};

export default headerService;
