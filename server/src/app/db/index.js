const mongoose = require('mongoose')

require('dotenv').config()
class DB {
    async connect() {
        const username = process.env.DB_USERNAME
        const password = process.env.DB_PASSWORD

        try {
            const connect = await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.5lnei.mongodb.net/database?retryWrites=true&w=majority`)
            console.log('Connected to database', connect.connection.host)
        }
        catch (error) {
            console.log(error)
        }

    }
}

module.exports = new DB()