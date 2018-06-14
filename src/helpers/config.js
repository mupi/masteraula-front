export const apiUrl = 'http://localhost:8000'

export default apiUrl

export function authHeader() {
    let session = JSON.parse(localStorage.getItem('session'));

    if (session && session.token) {
        return { 'Authorization': 'Bearer ' + session.token };
    } else {
        return {};
    }
}
