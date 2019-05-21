module.exports = function (socket) {
    console.log('connected', socket.id)

    socket.on('sendMessage', (message) => {
        console.log(message)
    })

    socket.on('disconnect', () => {
        console.log('disconnect')
    })
}