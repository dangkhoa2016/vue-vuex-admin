import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { BootstrapVue } from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VuetablePagination from "./components/VuetablePaginationBootstrap4.vue";
import { functions } from './helpers/functions';

import './app.scss'
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
// import 'vue-loading-overlay/dist/vue-loading.css';
import Vuetable from "vuetable-2";
import moment from 'moment';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas);
library.add(far);

Vue.prototype.moment = moment;
Vue.prototype.$func = functions;

Vue.config.productionTip = false;

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(VeeValidate);
// Init plugin
Vue.use(Loading, {
  // props
  'is-full-page': false
});

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('loading', Loading);
Vue.component('vuetable', Vuetable);
Vue.component('vuetable-pagination', VuetablePagination);
Vue.use(Vuex);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
