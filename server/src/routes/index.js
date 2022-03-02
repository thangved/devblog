const express = require('express')
const path = require('path')

const route = express.Router()

route.use('/user', require('./user'))
route.use('/post', require('./post'))

route.use('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../resources/index.html'))
})

module.exports = route