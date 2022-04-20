require('dotenv')
const mongoose = require('mongoose')
const DATABASE_URL = process.env.DATABASE_URL
const db = mongoose.connection
    
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

db.on('connected', () => {
    console.log('Mongo Connected')
})
db.on('disconnected', () => {
    console.log('Mongo Disconnected')
})
db.on('error', (err) => {
    console.log('Mongo Error', err)
})

module.exports = mongoose