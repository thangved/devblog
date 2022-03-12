const { request, response } = require('express')
const ModelUrl = require('../models/ModelUrl')
const Crawler = require('../utils/Crawler')
const Token = require('../utils/Token')

class UrlController {
    /**
     * 
     * @param {request} req 
     * @param {response} res 
     * @returns {Promise}
     */
    async create(req, res) {
        const { token, title, url } = req.body

        try {
            const existingUser = Token.resolve(token)
            if (!existingUser)
                return res.send({
                    success: false,
                    message: 'Token khong hop le'
                })

            const newUrl = new ModelUrl({
                title,
                url: 'https://' + url.replace(/http[s]{0,1}:\/\//, ''),
                author: existingUser._id,
                slug: Math.random().toString(36).slice(4),
            })
            await newUrl.save()

            res.send({
                success: true,
                data: {
                    ...newUrl.toObject(),
                    author: {
                        ...existingUser,
                        password: false,
                    },
                },
            })

        } catch (error) {
            res.send({
                success: false,
                message: error.toString(),
            })
        }
    }

    /**
     * 
     * @param {request} req 
     * @param {response} res 
     * @returns {Promise}
     */
    async info(req, res) {
        const { url } = req.query
        try {
            res.send({
                success: true,
                data: await Crawler(url)
            })
        }
        catch (error) {
            res.send({
                success: false,
                message: error.toString(),
            })
        }
    }
    /**
     * 
     * @param {request} req 
     * @param {response} res 
     * @returns {Promise}
     */
    async myLinks(req, res) {
        const { token } = req.body

        try {
            const existingUser = Token.resolve(token)
            if (!existingUser)
                return res.send({
                    message: 'Khong ton tai user',
                    success: false,
                })
            const data = await (await ModelUrl.find({ author: existingUser._id }).populate('author')).map(link => ({
                ...link.toObject(),
                author: {
                    ...link.toObject().author,
                    password: null
                }
            }))

            res.send({
                success: true,
                data,
            })
        }
        catch (error) {
            res.send({
                success: false,
                message: error.toString(),
            })
        }
    }

    /**
     * 
     * @param {request} req 
     * @param {response} res 
     */
    async convert(req, res) {
        const { slug } = req.params
        try {
            const existingUrl = await ModelUrl.findOne({ slug }).populate('author')

            const url = existingUrl.toObject()

            if (!existingUrl)
                return res.send({
                    success: false,
                    message: 'Khong ton tai url',
                })

            await ModelUrl.findByIdAndUpdate(url._id, { count: url.count + 1 })

            res.send({
                success: true,
                data: {
                    ...url,
                    author: {
                        ...url.author,
                        password: null,
                    }
                }
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.toString(),
            })
        }
    }

    /**
     * 
     * @param {request} req 
     * @param {response} res 
     */
    async remove(req, res) {
        const { token, _id } = req.body
        try {
            const existingUser = Token.resolve(token)
            if (!existingUser)
                return res.send({
                    success: false,
                    message: 'Invalid token',
                })

            ModelUrl.findOneAndDelete({ _id, author: existingUser._id }, error => {
                if (error)
                    return res.send({
                        success: false,
                        message: error.toString()
                    })
                res.send({
                    success: true,
                    message: 'Đã xóa'
                })
            })


        } catch (error) {
            res.send({
                success: false,
                message: error.toString(),
            })
        }
    }
}

module.exports = new UrlController()
