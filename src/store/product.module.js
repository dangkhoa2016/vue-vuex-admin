import ProductService from '../services/product.service';

const initialState = { list: [], product_detail: null, updated_product: null, created_product: null, deleted_product: 0 };

export const product = {
    namespaced: true,
    state: initialState,
    actions: {
        detail({ commit }, id) {
            return ProductService.getProductDetail(id).then(
                response => {
                    commit('productDetail', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('productDetail', null);
                    return Promise.reject(error);
                }
            );
        },
        clearDetail({ commit }) {
            commit('productDetail', {});
        },
        updateProduct({ commit }, product) {
            return ProductService.updateProduct(product).then(
                response => {
                    commit('updatedProduct', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('updatedProduct', null);
                    return Promise.reject(error);
                }
            );
        },
        createProduct({ commit }, product) {
            return ProductService.createProduct(product).then(
                response => {
                    commit('createdProduct', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('createdProduct', null);
                    return Promise.reject(error);
                }
            );
        },
        deleteProduct({ commit }, id) {
            return ProductService.deleteProduct(id).then(
                response => {
                    commit('deletedProduct', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('deletedProduct', null);
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        productDetail(state, value) {
            state.product_detail = value;
        },
        updatedProduct(state, value) {
            state.updated_product = value;
        },
        createdProduct(state, value) {
            state.created_product = value;
        },
        deletedProduct(state, value) {
            state.deleted_product = value;
        }
    }
};
