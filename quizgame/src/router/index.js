import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Authorization from '../views/Authorization.vue'
import CreateQuiz from '../views/CreateQuiz.vue'
import Quiz from '../views/Quiz.vue'
import UserInfo from '../views/UserInfo.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Authorization',
    component: Authorization,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/createquiz',
    name: 'CreateQuiz',
    component: CreateQuiz,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/user',
    name: 'UserInfo',
    component: UserInfo,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
