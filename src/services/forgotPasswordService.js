import {apiUrl} from 'helpers/config';
 
export const forgotPasswordService = {
    sendForgotPasswordEmail
};
 
function sendForgotPasswordEmail(email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    };
 
    return fetch(`${apiUrl}/auth/password/reset/ `, requestOptions)
        .then(handleResponse)
        .then(confirmation => {

            return confirmation;
        });
}

function handleResponse(response) {
    return response.json().then(data => {
        if (!response.ok) {
            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
        }
 
        return data;
    });
}