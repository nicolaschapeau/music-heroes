const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const socketio = require('socket.io')
const http = require('http')

// Routers imports
const userRouter = require('./routers/user.js')
const authRouter = require('./routers/auth.js')
const chatRouter = require('./routers/chat.js')
const ratingsRouter = require('./routers/rating.js')
const searchRouter = require('./routers/search.js')

// Init server
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT



// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH")
    res.header("Access-Control-Allow-Credentials", "true")

    if (req.method === "OPTIONS") {
        return res.status(200).end()
    }

    next();
});



// Server accepts
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))



// Routes initialisation
app.use(userRouter)
app.use(authRouter)
app.use(chatRouter)
app.use(ratingsRouter)
app.use(searchRouter)

const live = require('../socket')

io.on('connection', (socket) => {
    live(socket, io)
})



// Listen server
server.listen(port, 'localhost', () => {
    console.log('Server is up on port: ' + port)
})


