const connection = require('../app/database.js')
const {
    APP_PORT,
    APP_HOST
} = require('../app/config.js')
class FileServices {
    async create(mimetype, filename, size, userId) {
        const statement = `
            INSERT INTO avatar (mimetype, filename, size, user_id, avatar_url) VALUES (?, ?, ?, ?, ?)
        `
        const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${userId}`
        const [res] = await connection.execute(statement, [mimetype, filename, size, userId, avatarUrl])
        return res
    }
    async getAvatar(userId) {
        const statement = `
            SELECT * FROM avatar WHERE user_id = ?
        `
        const [res] = await connection.execute(statement, [userId])
        return res[0]
    }
    async savePictures(filename, mimetype, size, userId, momentId) {
        const statement = `
            INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?)
        `
        const [res] = await connection.execute(statement, [filename, mimetype, size, userId, momentId])
        return res
    }
}

module.exports = new FileServices()