import { apiUrl } from 'helpers/config';
 
const profileEditService = {
    profileEdit
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
 
function profileEdit(profile) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            name : profile.name,
        })
    };
 
    return fetch(`${apiUrl}/auth/registration/ `, requestOptions)
        .then(handleResponse)
        .then(detail => {
            return detail;
        });
}

export default profileEditService