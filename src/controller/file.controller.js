const {
    create,
    savePictures
} = require('../services/file.services.js')
class FileController {
    async create(ctx, next) {
        const { mimetype, filename, size } = ctx.req.file
        const { id: userId } = ctx.auth
        const res = await create(mimetype, filename, size, userId)
        ctx.body = res
    }
    async savePicture(ctx, next) {
        const files = ctx.req.files
        const { id: userId } = ctx.auth
        const { momentId } = ctx.query
        // 将所有的文件信息保存到数据库中
        for (let file of files) {
            const { filename, mimetype, size } = file
            await savePictures(filename, mimetype, size, userId, momentId)
        }
        ctx.body = '上传完成'
    }
}

module.exports = new FileController()