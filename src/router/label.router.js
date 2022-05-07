const Router = require('koa-router')

const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware.js')
const {
    create,
    add,
    getList
} = require('../controller/label.controller.js')
const {
    verifyLableExists
} = require('../middleware/label.middleware.js')

const lableRouter = new Router({ prefix: '/lable' })
lableRouter.post('/', verifyAuth, create)
lableRouter.get('/', getList)
lableRouter.post('/add/:momentId', verifyAuth, verifyPermission('moment'), verifyLableExists, add)

module.exports = lableRouter