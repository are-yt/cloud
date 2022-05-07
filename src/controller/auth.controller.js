const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config.js')

class AuthController {
    async login(ctx, next) {
        // 前面的中间件验证登录成功，颁发token
        const { name, id } = ctx.user
        const token = jwt.sign({name, id}, PRIVATE_KEY, {
            expiresIn: 60 * 60,
            algorithm: 'RS256'
        })
        ctx.body = {
            id,
            name,
            token
        }
    }
}

module.exports = new AuthController()