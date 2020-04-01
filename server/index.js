const express = require('express')
const cors = require('cors')
const app = express()

// constants
const port = process.env.PORT || 3001
const appName = 'FIKA'

// middleware
app.use(cors())

// routes
app.get('/', (req, res) => res.json({message: 'Hello from fika-server'}))

// launch app
app.listen(port, () => console.log(`${appName} listening at http://localhost:${port}`))