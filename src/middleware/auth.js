import cookies from 'vue-cookies'
import store from '@/store/store'

export default async function auth({ next, to, router }) {
    if (cookies.get('x-hp')) {
        let response = await store.dispatch('fetch')

        // Not correct
        if (response.success !== true) {
            store.commit('setLoading', false)
            return router.push({ name: 'login' })
        }

        store.commit('setLoading', false)
        return next()
    } else {
        store.commit('setLoading', false)
        return router.push({ name: 'login' })
    }

}