const Router = require('koa-router')
const {
    verifyAuth
} = require('../middleware/auth.middleware')
const {
    handlerAvatar,
    handlerPicture,
    pictureResize
} = require('../middleware/file.middleware.js')
const {
    create,
    savePicture
} = require('../controller/file.controller.js')

const fileRouter = new Router({ prefix: '/upload' })

fileRouter.post('/avatar', verifyAuth, handlerAvatar, create)
fileRouter.post('/picture', verifyAuth, handlerPicture, pictureResize, savePicture)

module.exports = fileRouter