export const apiUrl = 'http://192.168.15.14:8000'

export default apiUrl

export const handleResponse = (response) => {
    return response.json().then(data => {
        if (!response.ok) {
            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
        }
 
        return data;
    });
}