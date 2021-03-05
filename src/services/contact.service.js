import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.VUE_APP_API_URL}api/admin/contacts`;

class ContactService {

    getContactList() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    getContactDetail(id) {
        return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
    }

    updateContact(contact) {
        if (!contact)
            return Promise.reject(new Error('No contact data.'));
        var clone = Object.assign({}, contact);
        if (clone.photos) {
            clone.photos = JSON.stringify(clone.photos.map(photo => {
                return typeof photo === 'string' ? photo : photo.src
            }));
        }

        return axios.put(`${API_URL}/${contact.id}`, clone, { headers: authHeader() });
    }

    createContact(contact) {
        if (!contact)
            return Promise.reject(new Error('No contact data.'));
        var clone = Object.assign({}, contact);
        if (clone.photos) {
            clone.photos = JSON.stringify(clone.photos.map(photo => {
                return typeof photo === 'string' ? photo : photo.src
            }));
        }

        return axios.post(API_URL, clone, { headers: authHeader() });
    }

    deleteContact(id) {
        return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
    }
}

export default new ContactService();
