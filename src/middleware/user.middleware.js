const app = require('../app/index.js')
const {
    NAME_OR_PASSWORD_IS_REQUIRED,
    USER_ALREADY_EXISTS
} = require('../constants/error.types.js')

const {
    getUser
} = require('../services/user.services.js')

const md5Password = require('../utils/handle-password.js')
async function userVerify(ctx, next) {
    const { name, password } = ctx.request.body

    // 判断用户名和密码格式
    if (!name || !password) {
        const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    } else if (name) {
        // 判断该用户名是否已注册
        const res = await getUser(name)
        if (res.length) {
            // 已存在该用户名
            const error = new Error(USER_ALREADY_EXISTS)
            return ctx.app.emit('error', error, ctx)
        }
    }
    await next()
}
async function handlePassword(ctx, next) {
    // 密码加密
    ctx.request.body.password = md5Password(ctx.request.body.password)
    await next()
}

module.exports = {
    userVerify,
    handlePassword
}