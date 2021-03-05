import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.VUE_APP_API_URL}api/admin/roles`;

class RoleService {

    getRoleList() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    getAllRoles() {
        return axios.get(`${API_URL}/all`, { headers: authHeader() });
    }

    getRoleDetail(id) {
        return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
    }

    updateRole(role) {
        return axios.put(`${API_URL}/${role.id}`, role, { headers: authHeader() });
    }

    createRole(role) {
        return axios.post(API_URL, role, { headers: authHeader() });
    }
}

export default new RoleService();
