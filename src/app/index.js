const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { errorHandler } = require('./error.handler.js')
const app = new Koa()
app.use(bodyParser())
app.on('error', errorHandler)



module.exports = app