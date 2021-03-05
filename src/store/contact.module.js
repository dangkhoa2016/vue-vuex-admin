import ContactService from '../services/contact.service';

const initialState = { list: [], contact_detail: null, updated_contact: null, created_contact: null, deleted_contact: 0 };

export const contact = {
    namespaced: true,
    state: initialState,
    actions: {
        detail({ commit }, id) {
            return ContactService.getContactDetail(id).then(
                response => {
                    commit('contactDetail', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('contactDetail', null);
                    return Promise.reject(error);
                }
            );
        },
        clearDetail({ commit }) {
            commit('contactDetail', {});
        },
        updateContact({ commit }, contact) {
            return ContactService.updateContact(contact).then(
                response => {
                    commit('updatedContact', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('updatedContact', null);
                    return Promise.reject(error);
                }
            );
        },
        createContact({ commit }, contact) {
            return ContactService.createContact(contact).then(
                response => {
                    commit('createdContact', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('createdContact', null);
                    return Promise.reject(error);
                }
            );
        },
        deleteContact({ commit }, id) {
            return ContactService.deleteContact(id).then(
                response => {
                    commit('deletedContact', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('deletedContact', null);
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        contactDetail(state, value) {
            state.contact_detail = value;
        },
        updatedContact(state, value) {
            state.updated_contact = value;
        },
        createdContact(state, value) {
            state.created_contact = value;
        },
        deletedContact(state, value) {
            state.deleted_contact = value;
        }
    }
};
