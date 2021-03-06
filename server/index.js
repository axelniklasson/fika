const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
const uuid = require('uuid')
const asyncMutex = require('async-mutex')

const app = express()
app.use(cors())

// constants
const addr = process.env.ADDR || '0.0.0.0'
const port = process.env.PORT || 3001
const appName = 'FIKA'
const mutex = new asyncMutex.Mutex()

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

const messages = []
// clientId: { socketId, name, sessionId }
const clients = {}
const waitingClients = []
const sessions = {}

// sockets
io.on('connection', (socket) => {
    const clientId = uuid.v1()
    clients[clientId] = { socketId: socket.id }
    console.log(`New user connected. Assigned clientId: ${clientId}`)

    // emit clientId to client
    io.sockets.sockets[clients[clientId].socketId].emit('assigned_id', {
        connected: true,
        clientId,
        messages,
    })

    // setup done, attach name to client
    socket.on('identification', async ({ clientId, name }) => {
        const release = await mutex.acquire()
        const newClient = clients[clientId]
        try {
            newClient.name = name
            newClient.clientId = clientId
            if (waitingClients.length > 0) {
                // match clients
                const oldClient = waitingClients.shift()

                if (!io.sockets.sockets[oldClient.socketId]) {
                    waitingClients.push(newClient)
                    return
                }

                io.sockets.sockets[newClient.socketId].emit(
                    'match_successful',
                    {
                        receiverClientId: oldClient.clientId,
                        name: oldClient.name,
                        isLeader: false,
                    }
                )
                io.sockets.sockets[oldClient.socketId].emit(
                    'match_successful',
                    {
                        receiverClientId: newClient.clientId,
                        name: newClient.name,
                        isLeader: true,
                    }
                )

                const sessionId = uuid.v1()
                newClient.sessionId = sessionId
                oldClient.sessionId = sessionId
                sessions[sessionId] = [newClient, oldClient]
                console.log(
                    `Matched clients ${oldClient.clientId} and ${newClient.clientId} in session ${sessionId}`
                )
            } else {
                waitingClients.push(newClient)
            }
        } finally {
            release()
        }
    })

    // handle message from client
    socket.on('message', ({ message, clientId }) => {
        // get session from client
        const sessionId = clients[clientId].sessionId
        if (!messages[sessionId]) {
            messages[sessionId] = []
        }
        messages[sessionId].push({
            message,
            clientId,
            timestamp: Date.now(),
            name: clients[clientId].name,
        })

        // send messages to all users in session
        sessions[sessionId].forEach(({ socketId }) => {
            io.sockets.sockets[socketId].emit('update', {
                messages: messages[sessionId],
            })
        })
    })

    // handle disconnect
    socket.on('disconnect', (reason) => {
        console.log(`Client ${clientId} disconnected. Reason: ${reason}`)
        delete clients[clientId]
    })
})

// launch server
server.listen(port, addr, () =>
    console.log(`${appName} listening at http://${addr}:${port}`)
)

