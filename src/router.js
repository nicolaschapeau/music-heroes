import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

// Pages
import Home from '@/views'
import Login from '@/views/login'
import Register from '@/views/register'
import Search from '@/views/search'
import Profile from '@/views/profile'
import Verify from '@/views/verify'
import errorNotFound from '@/views/error/404'


// Middlewares
import authMiddleware from '@/middleware/authMiddleware'


// Layouts : { admin }


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: 'dashboard'},
      beforeEnter: (to, from, next) => {
        authMiddleware(to, from, next)
        next()
      },
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'default' },
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      meta: { layout: 'default' },
      component: Register
    },
    {
      path: '/search/:req',
      name: 'search',
      meta: { layout: 'dashboard' },
      beforeEnter: (to, from, next) => {
        authMiddleware(to, from, next)
        next()
      },
      component: Search
    },
    {
      path: '/profil/:id?',
      name: 'profil',
      meta: { layout: 'dashboard' },
      beforeEnter: (to, from, next) => {
        authMiddleware(to, from, next)
        next()
      },
      component: Profile,
    },
    {
      path: '/verify',
      name: 'verify',
      meta: { layout: 'dashboard'},
      component: Verify
    },

    // ERROR 404
    {
      path: '*', 
      name: '404',
      meta: { layout: 'error' },
      component: errorNotFound
    }
  ]
})

export default router