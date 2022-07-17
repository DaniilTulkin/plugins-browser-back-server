const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000
const URI = config.get('mongoUri')

async function start() {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(5000, () => console.log(`App has been started on port ${PORT}...`))
    }
    catch(e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}
