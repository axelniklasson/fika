const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
const uuid = require('uuid')

const app = express()
app.use(cors())

// constants
const addr = process.env.ADDR || '0.0.0.0'
const port = process.env.PORT || 3001
const appName = 'FIKA'

// routes
app.get('/', (req, res) => {
    revision = require('child_process')
        .execSync('git rev-parse HEAD')
        .toString()
        .trim()
    return res.json({ status: 'healthy', hash: revision })
})

const server = http.createServer(app)
const io = socketIo(server)
io.origins('*:*')

const sessions = {}
const messages = []
const clients = {}

// sockets
io.on('connection', (socket) => {
    const clientId = uuid.v1()
    clients[clientId] = socket.id
    console.log(`a user connected, assigning a clientId: ${clientId}`)
    io.sockets.sockets[clients[clientId]].emit('setup', {
        connected: true,
        clientId,
        messages,
    })

    socket.on('message', ({ message, clientId }) => {
        messages.push({ message, clientId, timestamp: Date.now() })
        io.emit('update', { messages })
    })
})

io.on('message', (data) => {
    console.log(data)
})

// launch server
server.listen(port, addr, () =>
    console.log(`${appName} listening at http://${addr}:${port}`)
)
