import { apiUrl } from 'helpers/config';
 
const loginService = {
    login,
    logout
};

export const handleResponse = (response) => {
    return response.json().then(data => {
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }
            if (data && data.non_field_errors){
                if (data.non_field_errors[0] === "E-mail is not verified."){
                    return Promise.reject("Email ainda não verificado");
                } else if (data.non_field_errors[0] === "Unable to log in with provided credentials."){
                    return Promise.reject("Usuário e/ou senha inválido(s)");
                }
            }
            const error = (data && data.non_field_errors) || response.statusText;
            return Promise.reject(error);
        }
 
        return data;
    });
}
 
function login (email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };
 
    return fetch(`${apiUrl}/auth/login/ `, requestOptions)
        .then(
            handleResponse,
            error => {
                return Promise.reject("Problemas de conexão com o banco de dados");
            }
        )
        .then(
            session => {
            if (session.token) {
                localStorage.setItem('session', JSON.stringify(session));
            }
 
            return session;
        });
}
 
function logout() {
    localStorage.removeItem('session');
}

export default loginService