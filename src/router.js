import Vue from 'vue'
import Router from 'vue-router'

// Pages
import Home from '@/views'
import Login from '@/views/login'
import Register from '@/views/register'
import Search from '@/views/search'
import Profile from '@/views/profile'
import Verify from '@/views/verify'
import errorNotFound from '@/views/error/404'


// Middlewares
import auth from '@/middleware/auth'


// Layouts : { admin }


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: 'dashboard' },
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
      meta: { layout: 'dashboard'},
      component: Search
    },
    {
      path: '/profil',
      name: 'profil',
      meta: { layout: 'dashboard' },
      component: Profile
    },
    {
      path: '/verify',
      name: 'verify',
      meta: { layout: 'dashboard' },
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


// Middleware code
//
// ->
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters)
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

// Before pushing to page if to has a middleware execute it
router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]

    const context = {
      from,
      next,
      router,
      to,
    }
    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({ ...context, next: nextMiddleware })
  }

  next()
})

export default router