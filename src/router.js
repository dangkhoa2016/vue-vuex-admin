import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import TokenHelper from './helpers/token.helper';
import store from './store';
import PathNotFound from '@/views/PathNotFound.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: 'Dashboard' }
    },
    {
        path: '/dashboard',
        component: Home,
        meta: { title: 'Dashboard' }
    },
    {
        path: '/login',
        component: Login,
        meta: { title: 'Login' }
    },
    {
        path: '/register',
        component: Register,
        meta: { title: 'Register' }
    },
    {
        path: '/profile',
        name: 'profile',
        // lazy-loaded
        component: () => import('./views/Profile.vue'),
        meta: { title: 'Show profile' }
    },
    {
        path: '/users',
        name: 'users',
        // lazy-loaded
        component: () => import('./views/Users.vue'),
        meta: { title: 'Users management' }
    },
    {
        path: '/articles',
        name: 'articles',
        // lazy-loaded
        component: () => import('./views/Articles.vue'),
        meta: { title: 'Articles management' }
    },
    {
        path: '/contacts',
        name: 'contacts',
        // lazy-loaded
        component: () => import('./views/Contacts.vue'),
        meta: { title: 'Contacts management' }
    },
    {
        path: '/products',
        name: 'products',
        // lazy-loaded
        component: () => import('./views/Products.vue'),
        meta: { title: 'Products management' }
    },
    {
        path: "*", name: 'not-found',
        component: PathNotFound,
        meta: { title: 'Path not found' }
    }
];


const router = new VueRouter({ mode: 'history', routes });

const DEFAULT_TITLE = process.env.VUE_APP_DEFAULT_TITLE;

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const user = TokenHelper.getCacheUser();
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !user) {
        // eslint-disable-next-line
        console.log('Missing token');
        store.dispatch('cache/save_url', to.path);
        store.dispatch('auth/logout');
        next('/login');
    } else {
        next();
    }
});

router.afterEach((to) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    Vue.nextTick(() => {
        document.title = to.meta.title ? `${to.meta.title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
    });
});

export default router;

