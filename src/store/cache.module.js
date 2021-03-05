


const initialState = { return_url: '' };

export const cache = {
    namespaced: true,
    state: initialState,
    actions: {
        save_url({ commit }, url) {
            commit('saveUrl', url);
        }
    },
    mutations: {
        saveUrl(state, value) {
            state.return_url = value;
        }
    }
};
