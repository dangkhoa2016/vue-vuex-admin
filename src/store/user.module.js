import UserService from '../services/user.service';

const initialState = { list: [], user_detail: null, updated_user: null, created_user: null, deleted_user: 0 };

export const user = {
    namespaced: true,
    state: initialState,
    actions: {
        detail({ commit }, id) {
            return UserService.getUserDetail(id).then(
                response => {
                    commit('userDetail', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('userDetail', null);
                    return Promise.reject(error);
                }
            );
        },
        list({ commit }) {
            return UserService.getAllUsers().then(
                response => {
                    commit('userList', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('userList', null);
                    return Promise.reject(error);
                }
            );
        },
        clearDetail({ commit }) {
            commit('userDetail', {});
        },
        updateUser({ commit }, user) {
            return UserService.updateUser(user).then(
                response => {
                    commit('updatedUser', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('updatedUser', null);
                    return Promise.reject(error);
                }
            );
        },
        createUser({ commit }, user) {
            return UserService.createUser(user).then(
                response => {
                    commit('createdUser', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('createdUser', null);
                    return Promise.reject(error);
                }
            );
        },
        deleteUser({ commit }, id) {
            return UserService.deleteUser(id).then(
                response => {
                    commit('deletedUser', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('deletedUser', null);
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        userDetail(state, value) {
            state.user_detail = value;
        },
        updatedUser(state, value) {
            state.updated_user = value;
        },
        createdUser(state, value) {
            state.created_user = value;
        },
        deletedUser(state, value) {
            state.deleted_user = value;
        },
        userList(state, value) {
            state.list = value;
        }
    }
};
