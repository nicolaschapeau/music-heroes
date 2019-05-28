import cookies from 'vue-cookies'
import store from '@/store/store'
import router from '@/router'

export default async function authMiddleware (to, from, next) {

    if (cookies.get('x-hp')) {
        let response = await store.dispatch('fetch')

        // Not correct
        if (response.success !== true) {
            return router.push({ name: 'login' })
        }

        return next()
    } else {
        return router.push({ name: 'login' })
    }
}