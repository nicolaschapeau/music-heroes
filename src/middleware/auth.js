import cookies from 'vue-cookies'
import store from '@/store/store'

export default async function auth({ next, to, router }) {
    if (cookies.get('x-hp')) {
        let response = await store.dispatch('fetch')

        // Not correct
        if (response.success !== true) {
            return router.push({ name: 'login' })
        }

        console.log('check')
        return next()
    } else {
        return router.push({ name: 'login' })
    }

}