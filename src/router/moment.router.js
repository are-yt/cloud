const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware.js')
const { create, detail, getAll, updateMoment, delMoment, getImages } = require('../controller/moment.controller.js')

const momentRouter = new Router({ prefix: '/moment' })
momentRouter.post('/', verifyAuth, create)
momentRouter.get('/:momentId', detail)
momentRouter.get('/', getAll)
momentRouter.post('/update', verifyAuth, verifyPermission('moment'), updateMoment)
momentRouter.post('/del', verifyAuth, verifyPermission('moment'), delMoment)
momentRouter.get('/images/:filename', getImages)

module.exports = momentRouter