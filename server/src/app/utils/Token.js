const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET_TOKEN = process.env.SECRET_TOKEN
class Token {
    sign(data) {
        return jwt.sign(data, SECRET_TOKEN)
    }
    resolve(token) {
        try {
            return jwt.verify(token, SECRET_TOKEN)
        }
        catch (error) {
            return null
        }
    }
}

module.exports = new Token()