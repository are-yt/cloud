const {
    create,
    reply,
    update,
    del,
    getComment
} = require('../services/comment.services.js')
class CommentController {
    async create(ctx, next) {
        const { momentId, content, userId } = ctx.request.body
        const res = await create(momentId, content, userId)
        ctx.body = res
    }
    async reply(ctx, next) {
        const { commentId, userId, content, momentId } = ctx.request.body
        const res = await reply(commentId, userId, content, momentId)
        ctx.body = res
    }
    async update(ctx, next) {
        const { commentId } = ctx.params
        const { content } = ctx.request.body
        const res = await update(commentId, content)
        ctx.body = res
    }
    async del(ctx, next) {
        const { commentId } = ctx.request.body
        const res = await del(commentId)
        ctx.body = res
    }
    async getComment(ctx, next) {
        const { momentId } = ctx.query
        const res = await getComment(momentId)
        ctx.body = res
    }
}

module.exports = new CommentController()