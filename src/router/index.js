import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/provoles',
    name: 'Provoles',
    component: () => import('../views/Provoles.vue')
  },
  {
    path: '/paixnidi',
    name: 'Paixnidi',
    component: () => import('../views/Paixnidi.vue')
  },
  {
    path: '/syzitiseis',
    name: 'Syzitiseis',
    component: () => import('../views/Syzitiseis.vue')
  },
  {
    path: '/alles-ekdilwseis',
    name: 'AllesEkdilwseis',
    component: () => import('../views/AllesEkdilwseis.vue')
  },
  {
    path: '/:notFound(.*)',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.beforeEach((_,_2,next) => {
  if(store.getters.response) store.commit('resetResponse');
  if(store.getters.registration) store.commit('resetRegistration');
  next();
})

export default router;