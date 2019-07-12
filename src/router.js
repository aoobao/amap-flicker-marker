import Vue from 'vue'
import Router from 'vue-router'
import app from '@/assets/js/utils'

import Home from './views/Home'
import MapView from './views/MapView'
// import Login from './views/Login'

Vue.use(Router)

let router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: '',
        redirect: 'mapView'
      }, {
        path: 'mapView',
        name: 'mapView',
        component: MapView
      }]
    }
    // ,
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to, 'router');
  if (to.meta.requiresAuth !== false) {
    let token = app.getItem('Authorization')
    if (!token) {
      next('/login');
      return;
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
