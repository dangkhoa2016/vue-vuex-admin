import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.VUE_APP_API_URL}api`;

class UserService {

    getUserProfile() {
        return axios.get(`${API_URL}/me`, { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(`${API_URL}/admin/dashboard`, { headers: authHeader() });
    }

    getUserList() {
        return axios.get(`${API_URL}/admin/users`, { headers: authHeader() });
    }

    getAllUsers() {
        return axios.get(`${API_URL}/admin/users/all`, { headers: authHeader() });
    }

    getUserDetail(id) {
        return axios.get(`${API_URL}/admin/users/${id}`, { headers: authHeader() });
    }

    updateUser(user) {
        if (!user)
            return Promise.reject(new Error('No user data.'));
       
        return axios.put(`${API_URL}/admin/users/${user.id}`, user, { headers: authHeader() });
    }

    createUser(user) {
        if (!user)
            return Promise.reject(new Error('No user data.'));
       
        return axios.post(`${API_URL}/admin/users`, user, { headers: authHeader() });
    }

    deleteUser(id) {
        return axios.delete(`${API_URL}/admin/users/${id}`, { headers: authHeader() });
    }
}

export default new UserService();
