const connection = require('../app/database.js')

class userServices {
    async create(user) {
        // 将user存储到数据库中
        const statement = `INSERT INTO users (name, password) VALUES(?, ?)`
        const res = await connection.execute(statement, [user.name, user.password])
        return res
    }
    // 查询用户是否存在
    async getUser(name) {
        const statement = `SELECT * FROM users WHERE name = ?`
        const res = await connection.execute(statement, [name])
        return res[0]
    }
}

module.exports = new userServices()