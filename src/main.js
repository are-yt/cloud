const app = require('./app')
const config = require('./app/config.js')
require('./app/database.js')
const useRoutes = require('./router')
useRoutes(app)

app.listen(config.APP_PORT, () => {
    console.log('服务器已启动')
})