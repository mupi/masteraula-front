import { apiUrl } from 'helpers/config';

const filterService = {
    listDisciplineFilters,
    listTeachingLevelFilters
};

//Get all disciplines that will be used in SideBar
function listDisciplineFilters() {
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

    return fetch(`${apiUrl}/disciplines`, requestOptions)
        .then(handleResponse)
        .then(disciplineFilters => {
            return disciplineFilters;
        });
}

//Get all TeachingLevels that will be used in SideBar
function listTeachingLevelFilters() {
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

    return fetch(`${apiUrl}/teaching_levels`, requestOptions)
        .then(handleResponse)
        .then(teachingLevelFilters => {
            return teachingLevelFilters;
        });
}

export default filterService
