import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.VUE_APP_API_URL}api/admin/products`;

class ProductService {

    getProductList() {
        return axios.get(API_URL, { headers: authHeader() });
    }

    getProductDetail(id) {
        return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
    }

    updateProduct(product) {
        if (!product)
            return Promise.reject(new Error('No product data.'));
        var clone = Object.assign({}, product);
        if (clone.photos) {
            clone.photos = JSON.stringify(clone.photos.map(photo => {
                return typeof photo === 'string' ? photo : photo.src
            }));
        }

        return axios.put(`${API_URL}/${product.id}`, clone, { headers: authHeader() });
    }

    createProduct(product) {
        if (!product)
            return Promise.reject(new Error('No product data.'));
        var clone = Object.assign({}, product);
        if (clone.photos) {
            clone.photos = JSON.stringify(clone.photos.map(photo => {
                return typeof photo === 'string' ? photo : photo.src
            }));
        }

        return axios.post(API_URL, clone, { headers: authHeader() });
    }

    deleteProduct(id) {
        return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
    }
}

export default new ProductService();
