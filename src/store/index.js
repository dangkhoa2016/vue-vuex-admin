import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { loading } from './loading.module';
import { cache } from './cache.module';
import { user } from './user.module';
import { role } from './role.module';
import { article } from './article.module';
import { contact } from './contact.module';
import { product } from './product.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    loading,
    cache,
    user,
    role,
    article,
    contact,
    product
  }
});
