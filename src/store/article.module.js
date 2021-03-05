import ArticleService from '../services/article.service';

const initialState = { list: [], article_detail: null, updated_article: null, created_article: null, deleted_article: 0 };

export const article = {
    namespaced: true,
    state: initialState,
    actions: {
        detail({ commit }, id) {
            return ArticleService.getArticleDetail(id).then(
                response => {
                    commit('articleDetail', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('articleDetail', null);
                    return Promise.reject(error);
                }
            );
        },
        clearDetail({ commit }) {
            commit('articleDetail', {});
        },
        updateArticle({ commit }, article) {
            return ArticleService.updateArticle(article).then(
                response => {
                    commit('updatedArticle', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('updatedArticle', null);
                    return Promise.reject(error);
                }
            );
        },
        createArticle({ commit }, article) {
            return ArticleService.createArticle(article).then(
                response => {
                    commit('createdArticle', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('createdArticle', null);
                    return Promise.reject(error);
                }
            );
        },
        deleteArticle({ commit }, id) {
            return ArticleService.deleteArticle(id).then(
                response => {
                    commit('deletedArticle', response.data);
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('deletedArticle', null);
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        articleDetail(state, value) {
            state.article_detail = value;
        },
        updatedArticle(state, value) {
            state.updated_article = value;
        },
        createdArticle(state, value) {
            state.created_article = value;
        },
        deletedArticle(state, value) {
            state.deleted_article = value;
        }
    }
};
