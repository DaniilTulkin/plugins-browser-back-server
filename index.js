const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const config = require('./config/config')

const auth = require('./routes/auth.routes')
const plugin = require('./routes/plugin.routes')

const app = express()

const PORT = 5000

app.use(cors())

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'assets')))

app.use('/api/auth', auth);
app.use('/api/plugin', plugin);

mongoose.connect(config.db)

mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected')
})

mongoose.connection.on('error', (err) => {
    console.log(`MongoDB is not connected. Error: ${err}`)
})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})