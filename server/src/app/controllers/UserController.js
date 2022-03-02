const { request, response } = require('express')
const ModelUser = require('../models/ModelUser')
const argon2 = require('argon2')
const Token = require('../utils/Token')

/**
 * 
 * @param {ModelUser} user 
 */
function publicUser(user) {
    delete user.password
    return user
}

class UserController {
    /**
     * 
     * @param {request} req 
     * @param {response} res 
     */
    async create(req, res) {
        const { body } = req
        const { fullName, username, password, confirmPassword } = body

        // Check fullName
        if (!fullName)
            return res.send({
                success: false,
                message: 'Vui lòng nhập họ tên của bạn'
            })

        // Check username
        if (!username)
            return res.send({
                success: false,
                message: 'Vui lòng nhập tên đăng nhập'
            })

        // Check password
        if (!password)
            return res.send({
                success: false,
                message: 'Vui lòng nhập mật khẩu'
            })

        if (!confirmPassword)
            return res.send({
                success: false,
                message: 'Vui lòng nhập lại mật khẩu'
            })

        if (!(confirmPassword === password))
            return res.send({
                success: false,
                message: 'Mật khẩu nhập lại không chính xác'
            })

        const newUser = new ModelUser({
            ...body,
            password: await argon2.hash(password)
        })

        newUser.save((error) => {
            if (error)
                return res.send({
                    success: false,
                    message: 'Tên người dùng đã tồn tại'
                })
            res.send({
                success: true,
                data: {
                    token: Token.sign(newUser.toObject()),
                }
            })
        })

    }

    /**
     * 
     * @param {request} req 
     * @param {response} res 
     */
    async get(req, res) {
        const { params } = req
        const { username } = params
        if (!params)
            return res.send({
                success: false,
                message: 'Vui lòng nhập username',
            })

        try {
            const user = await ModelUser.findOne({ username })
            if (!user)
                return res.send({
                    success: false,
                    message: 'Không tìm thấy user'
                })
            res.send({
                success: true,
                data: publicUser(user.toObject()),
            })
        }
        catch (error) {
            res.send({
                success: false,
                message: error.toString()
            })
        }
    }
    /**
     * 
     * @param {request} req 
     * @param {response} res 
     */
    async gets(req, res) {
        try {
            const users = await ModelUser.find({})
            res.send({
                success: true,
                data: users.map(user => publicUser(user.toObject())),
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
    async login(req, res) {
        const username = req.body.username
        const password = req.body.password

        if (!username)
            return res.send({
                success: false,
                message: 'Vui lòng nhập username',
            })

        if (!password)
            return res.send({
                success: false,
                message: 'Vui lòng nhập password',
            })

        let user = await ModelUser.findOne({ username })
        if (!user)
            return res.send({
                success: false,
                message: 'Tên đăng nhập hoặc mật khẩu không đúng'
            })

        user = user.toObject()

        if (!await argon2.verify(user.password, password))
            return res.send({
                success: false,
                message: 'Tên đăng nhập hoặc mật khẩu không đúng'
            })

        res.send({
            success: true,
            data: {
                token: Token.sign(user),
            },
        })
    }
    /**
     * 
     * @param {request} req 
     * @param {response} res 
     */
    async auth(req, res) {
        const token = req.body.token
        res.send({
            success: true,
            data: publicUser(Token.resolve(token)),
        })
    }
}

module.exports = new UserController()
