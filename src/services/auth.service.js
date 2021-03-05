import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.VUE_APP_API_URL}api`;

class AuthService {
    login(user) {
        return axios
            .post(`${API_URL}/admin-login`, {
                user_name: user.user_name,
                password: user.password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        return axios
            .get(`${API_URL}/admin-logout`, { headers: authHeader() })
            .then(() => {
                localStorage.removeItem('user');
            }).catch((ex) => {
                // eslint-disable-next-line
                console.log('Error when loglout', ex);
                localStorage.removeItem('user');
            });
    }

    register(user) {
        return axios.post(`${API_URL}/admin-register`, {
            user_name: user.user_name,
            full_name: user.fullname,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();
