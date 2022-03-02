const express = require('express')
const PostController = require('../app/controllers/PostController')

const route = express.Router()

route.post('/create', PostController.create)
route.post('/me', PostController.myPosts)

route.post('/remove', PostController.remove)

route.post('/update', PostController.update)

route.get('/topic/:topic', PostController.topic)
route.get('/get/:slug', PostController.slug)
route.get('/_id/:_id', PostController._id)
route.get('/all', PostController.all)

module.exports = route