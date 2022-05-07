const connection = require('../app/database.js')

class AuthServices {
    async getUserByName(name) {
        const statement = `SELECT * FROM users WHERE name = ?`
        const res = await connection.execute(statement, [name])
        return res[0]
    }
    async checkPermission(tableName, id, userId) {
        const statement = `
            SELECT *
            FROM ${tableName}
            WHERE id = ? AND user_id = ?
        `
        const res = await connection.execute(statement, [id, userId])
        return Boolean(res[0].length)
    }
}

module.exports = new AuthServices()