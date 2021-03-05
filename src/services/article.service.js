import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.VUE_APP_API_URL}api/admin/articles`;

class ArticleService {

    getArticleList() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    getArticleDetail(id) {
        return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
    }

    updateArticle(article) {
        if (!article)
            return Promise.reject(new Error('No article data.'));

        return axios.put(`${API_URL}/${article.id}`, article, { headers: authHeader() });
    }

    createArticle(article) {
        if (!article)
            return Promise.reject(new Error('No article data.'));

        return axios.post(API_URL, article, { headers: authHeader() });
    }

    deleteArticle(id) {
        return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
    }
}

export default new ArticleService();
