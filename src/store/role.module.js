import RoleService from '../services/role.service';

const initialState = { list: [], updated_role: null, created_role: null, role_detail: null };

export const role = {
    namespaced: true,
    state: initialState,
    actions: {
        detail({ commit }, id) {
            return RoleService.getRoleDetail(id).then(
                response => {
                    commit('roleDetail', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('roleDetail', null);
                    return Promise.reject(error);
                }
            );
        },
        list({ commit }) {
            return RoleService.getAllRoles().then(
                response => {
                    commit('roleList', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('roleList', null);
                    return Promise.reject(error);
                }
            );
        },
        clearDetail({ commit }) {
            commit('roleDetail', {});
        },
        updateRole({ commit }, role) {
            return RoleService.updateRole(role).then(
                response => {
                    commit('updatedRole', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('updatedRole', null);
                    return Promise.reject(error);
                }
            );
        },
        createRole({ commit }, role) {
            return RoleService.createRole(role).then(
                response => {
                    commit('createdRole', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('createdRole', null);
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        roleDetail(state, value) {
            state.role_detail = value;
        },
        updatedRole(state, value) {
            state.updated_role = value;
        },
        createdRole(state, value) {
            state.created_role = value;
        },
        roleList(state, value) {
            state.list = value;
        }
    }
};
