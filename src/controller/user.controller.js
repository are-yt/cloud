const services = require('../services/user.services.js')
const fileServices = require('../services/file.services.js')
const fs = require('fs')
const path = require('path')

class UserController {
    async create(ctx, next) {
        // 获取用户传递的参数
        const user = ctx.request.body
        // 数据库操作
        const res = await services.create(user)
        // 返回数据
        ctx.body = res
    }
    async getAvatar(ctx, next) {
        const { userId } = ctx.params
        const res = await fileServices.getAvatar(userId)
        // 不设置content-type类型，返回给浏览器，浏览器会以为是个文件，会自动下载，设置了图片类型，浏览器则会显示
        ctx.response.set('content-type', res.mimetype)
        ctx.body = fs.ReadStream(path.resolve(__dirname, '../uploads', res.filename))
    }
}

module.exports = new UserController()