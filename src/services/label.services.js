const connection = require('../app/database.js')
class LabelServices {
    async create(name) {
        const statement = `
            INSERT INTO label (name) VALUES (?)
        `
        const [result] = await connection.execute(statement, [name])
        return result
    }
    async checkLableExists(name) {
        const statement = `
            SELECT * FROM lable WHERE name = ?
        `
        const [result] = await connection.execute(statement, [name])
        return result
    }
    async hasLable(momentId, lableId) {
        const statement = `
            SELECT * FROM moment_lable ml
            WHERE ml.lable_id = ? AND ml.moment_id = ?
        `
        const [res] = await connection.execute(statement, [lableId, momentId])
        return res
    }
    async add(momentId, lableId) {
        const statement = `
            INSERT INTO moment_lable (moment_id, lable_id) VALUES (?, ?)
        `
        const [result] = await connection.execute(statement, [momentId, lableId])
        return result
    }
    async getList(offset, size) {
        const statement = `
            SELECT id, name FROM lable LIMIT ?, ?
        `
        const [res] = await connection.execute(statement, [offset, size])
        return res
    }
}

module.exports = new LabelServices()