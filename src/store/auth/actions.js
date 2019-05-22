const api = require('@/api/api').default;

export default {
    async register({ commit }, credentials) {
        try {
            // Make request and parse results
            let response = await api.auth.register(credentials)
            response = response.data

            if (response.success !== true) {
                throw ''
            }

            commit('setToken', response.token)
            commit('setUser', response.user)

            // Return success
            return { success: true, message: 'Authentification réussie.' }
        } catch (e) {
            // Return error
            return { success: false, message: 'Impossible de créer un compte avec ces informations.' }
        }
    },
    async login({ commit }, credentials) {
        try {
            // Make request and parse results
            let response = await api.auth.login(credentials)
            response = response.data

            if (response.success !== true) {
                throw ''
            }

            commit('setToken', response.token)
            commit('setUser', response.user)

            // Return success
            return { success: true, message: 'Authentification réussie.' }
        } catch (e) {
            // Return error
            return { success: false, message: 'Impossible de s\'authentifier.' }
        }
    },
    async fetch({ commit }) {
        try {
            let response = await api.auth.fetch()
            response = response.data

            if (!response.success) {
                throw ''
            }

            commit('setToken', response.token)
            commit('setUser', response.user)

            // Return success
            return { success: true, message: 'Connexion validée.' }
        } catch (e) {
            // Return error
            commit('deleteToken')
            commit('deleteUser')

            return { success: false, message: 'Impossible de vérifier le token.' }
        }
    },
    async logout({ commit }) {
        try {
            commit('deleteToken')
            commit('deleteUser')
            console.log('disconnected')

            let response = await api.auth.logout()
            response = response.data

            return { success: true }
        } catch (e) {
            commit('deleteToken')
            commit('deleteUser')
            console.log('disconnected')

            return { success: true }
        }
    }
}