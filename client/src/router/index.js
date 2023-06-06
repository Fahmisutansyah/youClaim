import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue's
import HomePage from '../views/Home/HomePage.vue'
import DashboardView from '../views/Dashboard/DashboardView.vue'
import userAuth from '../utils/userAuth'
import CampaignDetail from '../views/CampaignDetail/CampaignDetail.vue'

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
      component: () => import('../views/Login/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { auth: true }
    },
    {
      path: '/campaigns',
      name: 'campaigns',
      component: CampaignDetail,
      meta: { auth: true },
      children: [
        {
          path: ':id',
          name: 'campaign details',
          component: () => import('../views/CampaignDetail/CampaignDetail.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta?.auth) {
    if (!userAuth.isTokenAv()) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
