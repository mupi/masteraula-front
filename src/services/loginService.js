import {apiUrl} from './config';
 
export const loginService = {
    login,
    logout
};
 
function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
 
    return fetch(`${apiUrl}/auth/login/ `, requestOptions)
        .then(handleResponse)
        .then(session => {
            if (session.token) {
                localStorage.setItem('session', JSON.stringify(session));
            }
 
            return session.user;
        });
}
 
function logout() {
    localStorage.removeItem('session');
}

function handleResponse(response) {
    return response.json().then(data => {
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }
 
            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
        }
 
        return data;
    });
}