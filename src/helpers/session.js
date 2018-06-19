export const authHeader = () => {
    let session = JSON.parse(localStorage.getItem('session'));

    if (session && session.token) {
        return { 'Authorization': 'Bearer ' + session.token };
    } else {
        return {};
    }
}

export const isLoggedIn = () => {
    let session = JSON.parse(localStorage.getItem('session'));

    if (session && session.token) {
        return true
    } else {
       return false
    }
}
