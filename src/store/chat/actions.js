const api = require('@/api/api').default;

export default {
    async setChats({ commit }) {
        try {
            // Make request and parse results
            let response = await api.chat.getAll()
            response = response.data

            if (response.success !== true) {
                throw ''
            }

            commit('setChats', response.chats)

            // Return success
            return { success: true, message: 'Récuperation des chats réussie.' }
        } catch (e) {
            // Return error
            return { success: false, message: 'Impossible d\'acceder aux chats.' }
        }
    }
}