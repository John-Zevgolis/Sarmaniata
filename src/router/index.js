import Vue from 'vue';
import VueRouter from 'vue-router';

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
    path: '/paidikes-drastiriotites',
    name: 'PaidikesDrastiriotites',
    component: () => import('../views/PaidikesDrastiriotites.vue')
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
    name: '404',
    component: () => import('../views/404.vue')
    // redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      console.log(savedPosition)
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

export default router;