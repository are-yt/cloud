const Router = require('koa-router')
const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware.js')
const {
    create,
    reply,
    update,
    del,
    getComment
} = require('../controller/comment.controller.js')

const commentRouter = new Router({ prefix: '/comment' })

commentRouter.post('/', verifyAuth, create)
commentRouter.post('/reply', verifyAuth, reply)
commentRouter.patch('/:commentId', verifyAuth, verifyPermission('comment'), update)
commentRouter.post('/del', verifyAuth, verifyPermission('comment'), del)
commentRouter.get('/', getComment)

module.exports = commentRouter