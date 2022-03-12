const express = require('express')
const UrlController = require('../app/controllers/UrlController')

const route = express.Router()

route.post('/create', UrlController.create)
route.post('/my-links', UrlController.myLinks)
route.post('/remove', UrlController.remove)

route.get('/info', UrlController.info)
route.get('/convert/:slug', UrlController.convert)

module.exports = route