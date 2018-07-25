import { apiUrl } from 'helpers/config';

const filterService = {
    listFilters
};

function fetchQuestion(id) {
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

    return fetch(`${apiUrl}/questions/${id}/`, requestOptions)
        .then(handleResponse)
        .then(activeQuestion => {
            return activeQuestion;
        });
}

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

function rateQuestion() {

}

export default filterService
