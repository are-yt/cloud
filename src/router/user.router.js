const Router = require('koa-router')
const {
    create,
    getAvatar
} = require('../controller/user.controller.js')

const {
    userVerify,
    handlePassword
} = require('../middleware/user.middleware.js')
const userRouter = new Router({ prefix: '/user' })
userRouter.post('/', userVerify, handlePassword, create)
userRouter.get('/:userId', getAvatar)

module.exports = userRouter