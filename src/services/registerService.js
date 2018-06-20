import {apiUrl, handleResponse} from 'helpers/config';
 
const registerService = {
    register
};
 
function register(email, password, name) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            username : email,
            email, 
            password1 : password,
            password2 : password,
            name
        })
    };
 
    return fetch(`${apiUrl}/auth/registration/ `, requestOptions)
        .then(handleResponse)
        .then(detail => {
            return detail;
        });
}

export default registerService