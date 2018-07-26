import { apiUrl } from 'helpers/config';

const filterService = {
    listFilters 
};


function listFilters(filterName) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    const handleResponse = (response) => {
        return response.json().then(data => {
            if (!response.ok) {
                const error = (data && data.email);
                return Promise.reject(error);
            }

            return data;
        });
    }

    return fetch(`${apiUrl}/${filterName}`, requestOptions)
        .then(handleResponse)
        .then(filters => {
            return filters;
        });
}


export default filterService
