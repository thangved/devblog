const express = require('express')
const cors = require('cors')
require('dotenv').config()

const routes = require('./src/routes')
const DB = require('./src/app/db')

const PORT = process.env.PORT || 5000

DB.connect()
const app = express()

app.use(require('body-parser').json())
app.use('/', cors({
    origin: '*',
    optionsSuccessStatus: 200,
}), routes)

app.listen(PORT, () => console.log('Server run in port: ', PORT))