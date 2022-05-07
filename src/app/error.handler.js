const errorTypes = require('../constants/error.types.js')
const errorHandler = (error, ctx) => {
    let status, message
    switch (error.message) {
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400 // bad request
            message = '用户名或密码不能为空'
            break;
        case errorTypes.USER_ALREADY_EXISTS:
            status = 409 // 
            message = '用户名已经存在'
            break;
        case errorTypes.USER_NOT_EXISTS:
            status = 400
            message = '用户不存在'
            break;
        case errorTypes.PASSWORD_IS_INCORRECT:
            status = 400
            message = '密码不正确'
            break;
        case errorTypes.NO_AUTH:
            status = 401
            message = '无效token,授权失败'
            break;
        case errorTypes.MOMENT_NEED_ID:
            status = 400
            message = '/moment需要id字段'
            break;
        case errorTypes.MOMENT_NEED_CONTENT:
            status = 400
            message = '/moment需要content字段'
            break;
        case errorTypes.NO_PERMISSION:
            status = 401
            message = '没有操作权限'
            break;
        default:
            status = 404
            message = 'NOT FOUND'
    }
    ctx.status = status
    ctx.body = message
}

module.exports = {
    errorHandler
}