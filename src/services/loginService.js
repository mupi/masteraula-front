import {apiUrl, handleResponse} from 'helpers/config';
 
const loginService = {
    login,
    logout
};
 
function login (email, password) {
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

export default loginService