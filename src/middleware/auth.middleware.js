const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../app/config.js')
const {
    NAME_OR_PASSWORD_IS_REQUIRED,
    USER_NOT_EXISTS,
    PASSWORD_IS_INCORRECT,
    NO_AUTH,
    NO_PERMISSION
} = require('../constants/error.types')
const {
    getUserByName,
    checkPermission
} = require('../services/auth.services.js')
const md5Password = require('../utils/handle-password.js')
const verifyLogin = async (ctx, next) => {
    const { name, password } = ctx.request.body
    // 账号密码格式
    if (!name || !password) {
        const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }
    // 检查用户是否存在
    const res = await getUserByName(name)
    if (!res.length) {
        const error = new Error(USER_NOT_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }
    // 检查用户账号密码是否正确
    if (md5Password(password) !== res[0].password) {
        const error = new Error(PASSWORD_IS_INCORRECT)
        return ctx.app.emit('error', error, ctx)
    }
    ctx.user = res[0]
    await next()
}

const verifyAuth = async (ctx, next) => {
    const token = ctx.header.authorization ? ctx.header.authorization.replace('Bearer ', '') : null
    try {
        const res = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        })
        ctx.auth = res
        try {
            await next()
        } catch(err) {
            ctx.status = 500
            ctx.body = '未知错误'
            console.log(err.message)
        }
    } catch(err) {
        const error = new Error(NO_AUTH)
        ctx.app.emit('error', error, ctx)
    }
}
const verifyPermission = (tableName) => {
    return async (ctx, next) => {
        const { id, userId } = ctx.request.body
        const isPermission = await checkPermission(tableName, id, userId)
        if (!isPermission) {
            // 不具备操作权限
            const error = new Error(NO_PERMISSION)
            return ctx.app.emit('error', error, ctx)
        }
        await next()
    }
}
module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}