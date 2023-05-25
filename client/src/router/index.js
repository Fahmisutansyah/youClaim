import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue's
import HomePage from '../views/Home/HomePage.vue'
import DashboardView from '../views/Dashboard/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login/LoginView.vue'),
      meta: { guest: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { hasTkn: true }
    }
  ]
})

router.beforeEach((to, from, next) => {})

export default router
