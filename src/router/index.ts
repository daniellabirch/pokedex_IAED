import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Pokemon from '../components/Pokemon.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:
  [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/:name',
      name: ':name',
      id:':id',
      height:':height',
      component: Pokemon,
      props: true,
      //component: ()=>import('../components/Pokemon.vue'),
      // props: {weight: 100},
      meta: {weight: 150, height:':height'},
      //props: (route) => ({ height: route.params.weight, id: route.params.id })
    },
    // {
    //   path: '/pokemon',
    //   name: 'pokemon',
    //   component: Pokemon,
    // },
  ],
})

export default router
