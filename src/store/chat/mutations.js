export default {
    setChats(state, chats) {
        state.chats = chats
    },
    setSocket(state, socket) {
        state.socket = socket
    },
    deleteSocket(state) {
        state.socket = null
    },
}