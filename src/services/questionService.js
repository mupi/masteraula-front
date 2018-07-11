import { apiUrl } from 'helpers/config';

const questionService = {
    rateQuestion,
    fetchQuestion
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

function fetchQuestion(id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id : id
        })
    };

    return fetch(`${apiUrl}/questions/${id}`, requestOptions)
        .then(handleResponse)
        .then(activeQuestion => {
            return activeQuestion;
        });
}

function rateQuestion() {

}
