import { apiUrl } from 'helpers/config';

const filterService = {
    listFilters /*,
    listTeachingLevel*/
};


function listFilters(page) {
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

    return fetch(`${apiUrl}/questions/?page=${page}`, requestOptions)
        .then(handleResponse)
        .then(questionPage => {
            return questionPage;
        });
}


export default filterService
