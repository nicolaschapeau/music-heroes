export default {
    setChats(state, chats) {
        
        chats.sort((a, b) => {
            return new Date(b.message.createdAt).getTime() - new Date(a.message.createdAt).getTime()
        })

        state.chats = chats
    },
    setSocket(state, socket) {
        state.socket = socket
    },
    deleteSocket(state) {
        state.socket = null
    },
}