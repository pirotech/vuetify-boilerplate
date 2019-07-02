import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login';
import Home from './views/Home';

Vue.use(Router);

const redirectUnauthorized = (to, from, next) => {
  const token = localStorage.getItem('token');
  token ? next() : next('/login');
};

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: redirectUnauthorized,
    },
  ],
});
