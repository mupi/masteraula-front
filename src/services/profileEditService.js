import { authHeader } from 'helpers';
import { apiUrl  } from 'helpers/config';
 
const profileEditService = {
    profileEdit
};

export const DIFFERENT_OLD_PASSWORD = "DIFFERENT_OLD_PASSWORD"

const handleResponse = (response) => {
    return response.json().then(data => {
        if (!response.ok) {
            const error = (data && data.email);
            return Promise.reject(error);
        }
 
        return data;
    });
}
 
const handlePasswordResponse = (response) => {
    return response.json().then(data => {
        if (!response.ok) {
            console.log(123421341324231423)
            return Promise.reject('DIFFERENT_OLD_PASSWORD');
        }
 
        return data;
    });
}
 
function profileEdit(profile) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': authHeader() 
        },
        body: JSON.stringify({ 
            name : profile.name,
        })
    };

    const requestPasswordOption = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': authHeader()
        },
        body: JSON.stringify({ 
            old_password : profile.old_password,
            new_password1 : profile.new_password1,
            new_password2 : profile.new_password2
        })
    }

    if (profile.old_password){
        return fetch(`${apiUrl}/auth/password/change/`, requestPasswordOption)
        .then(handlePasswordResponse)
        .then(() => {
            return fetch(`${apiUrl}/auth/user/ `, requestOptions)
            .then(handleResponse)
            .then(detail => {
                return detail;
            });
        });
    }
 
    return fetch(`${apiUrl}/auth/user/ `, requestOptions)
        .then(handleResponse)
        .then(detail => {
            return detail;
        });
}

export default profileEditService