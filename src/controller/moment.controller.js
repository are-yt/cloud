const fs = require('fs')
const path = require('path')
const {
    create,
    getDetail,
    getAll,
    update,
    delMoment,
    getImages
} = require('../services/moment.services.js')
const {
    MOMENT_NEED_ID,
    MOMENT_NEED_CONTENT
} = require('../constants/error.types.js')

class MomentController {
    async create(ctx, next) {
        const user_id = ctx.request.body.id
        const content = ctx.request.body.content
        if (!user_id) {
            const error = new Error(MOMENT_NEED_ID)
            return ctx.app.emit('error', error, ctx)
        }
        if (!content) {
            const error = new Error(MOMENT_NEED_CONTENT)
            return ctx.app.emit('error', error, ctx)
        }
        const res = await create(content, user_id)
        ctx.body = res
    }
    async detail(ctx, next) {
        const moment_id = ctx.params.momentId
        const res = await getDetail(moment_id)
        ctx.body = res
    }
    async getAll(ctx, next) {
        const { offset, size } = ctx.query
        const res = await getAll(offset, size)
        ctx.body = res
    }
    async updateMoment(ctx, next) {
        // 验证通过，确定可以修改动态
        const { mid, content } = ctx.request.body
        const res = await update(mid, content)
        ctx.body = res
    }
    async delMoment(ctx, next) {
        const { id } = ctx.request.body
        const res = await delMoment(id)
        ctx.body = res
    }
    async getImages(ctx, next) {
        const { filename } = ctx.params
        const res = await getImages(filename)
        console.log(res)
        ctx.response.set('content-type', res.mimetype)
        ctx.body = fs.ReadStream(path.resolve(__dirname, '../uploads', 'pictures', res.filename))
    }
}

module.exports = new MomentController()