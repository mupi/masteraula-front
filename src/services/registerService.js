import {apiUrl} from 'helpers/config';
 
const registerService = {
    register
};

export const handleResponse = (response) => {
    return response.json().then(data => {
        if (!response.ok) {
            const error = (data && data.email);
            return Promise.reject(error);
        }
 
        return data;
    });
}
 
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