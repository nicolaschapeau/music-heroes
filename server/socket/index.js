const axios = require('axios')

// Axios default url
axios.defaults.baseURL = 'http://localhost:3000'

// Api
const chat = {
    createMessage: (id, content) => axios.post(`/chats/${id}`, content, {
        withCredentials: true,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
}

// Socket events
module.exports = function (socket) {

    socket.on('sendMessage', async (message) => {
        try {
            let data = {
                content: message.content,
                user: message.user._id,
                server_key: process.env.SERVER_KEY
            }

            let response = await chat.createMessage(message.room, data)

            // If not success
            if (!response.data.content) {
                throw new Error(`Erreur durant l'envoi du message`)
            }

            console.log('Message envoyé !')
        } catch (e) {
            console.log('Erreur !')
        }
    })

    socket.on('disconnect', () => {
        console.log('disconnect')
    })
}