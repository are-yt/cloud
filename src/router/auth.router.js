const Router = require('koa-router')

const authRouter = new Router()

const {
    login
} = require('../controller/auth.controller.js')
const {
    verifyLogin,
    verifyAuth
} = require('../middleware/auth.middleware.js')

authRouter.post('/login', verifyLogin, login)
authRouter.get('/test', verifyAuth, (ctx, next) => {
    ctx.body = 'ok'
})

module.exports = authRouter