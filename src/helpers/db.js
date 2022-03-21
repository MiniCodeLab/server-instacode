const mongoose = require('mongoose');
require('dotenv').config()

const urlDb = process.env.MONGO_URI

const connectDb = async () => {
    try {
        const db = await mongoose.connect(urlDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const { name, host } = db.connection
        console.log(`Connected with db 💾 name: ${name} in host: ${host}`)
    } catch (error) {
        console.error('Error to connect with db 💾', error);
    }
}

module.exports = {
    connectDb
}