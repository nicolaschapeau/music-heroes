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
module.exports = function (socket, io) {
    socket.on('join', (room) => {
        socket.join(room)
    })

    socket.on('leave', (room) => {
        socket.leave(room)
    })

    socket.on('createChat', (user) => {
        socket.to(user).emit('updateChats')
    })

    socket.on('sendMessage', async (message, callback) => {
        try {
            let data = {
                content: message.content,
                user: message.user,
                server_key: process.env.SERVER_KEY
            }

            let response = await chat.createMessage(message.room, data)

            // If not success
            if (!response.data.content) {
                throw new Error(`Erreur durant l'envoi du message`)
            }

            // If success
            message.user = message.user._id
            io.to(message.room).emit('receiveMessage', message)

            callback({ success: true })
        } catch (e) {
            callback({ success: false })
        }
    })

    socket.on('disconnect', () => {
    })
}