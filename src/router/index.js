const fs = require('fs')
const path = require('path')
const useRoutes = (app) => {
    fs.readdir(__dirname, (err, files) => {
        files.forEach((file) => {
            if (file === 'index.js') {
                return false;
            }
            const router = require(path.resolve(__dirname, file))
            app.use(router.routes())
        })
    })
}

module.exports = useRoutes