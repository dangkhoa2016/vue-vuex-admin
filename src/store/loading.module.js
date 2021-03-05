
const initialState = { status: false };

export const loading = {
    namespaced: true,
    state: initialState,
    actions: {
        show({ commit }) {
            commit('showLoading', true);
        },
        hide({ commit }) {
            commit('showLoading', false);
        }
    },
    mutations: {
        showLoading(state, value) {
            state.status = value;
        }
    }
};
