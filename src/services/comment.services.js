const connection = require('../app/database.js')
class CommentServices {
    async create(momentId, content, userId) {
        const statement = `
            INSERT INTO comment (moment_id, content, user_id)
            VALUES (?, ?, ?)
        `
        const res = await connection.execute(statement, [momentId, content, userId])
        return res[0]
    }
    async reply(commentId, userId, content, momentId) {
        const statement = `
        INSERT INTO comment (moment_id, user_id, content, comment_id) VALUES (?, ?, ?, ?);
        `
        const res = await connection.execute(statement, [momentId, userId, content, commentId])
        return res[0]
    }
    async update(commentId, content) {
        const statement = `
            UPDATE comment SET content = ? WHERE id = ?
        `
        const [result] = await connection.execute(statement, [content, commentId])
        return result
    }
    async del(commentId) {
        const statement = `
            DELETE FROM comment
            WHERE id = ?
        `
        const [result] = await connection.execute(statement, [commentId])
        return result
    }
    async getComment(momentId) {
        const statement = `
            SELECT
                JSON_ARRAYAGG(
                    JSON_OBJECT('id', c.id, 'content', c.content, 'createAt', c.createAt, 'user', JSON_OBJECT('id', u.id, 'name', u.name, 'avatar_url', a.avatar_url))
                ) comments
            FROM comment c
            LEFT JOIN moment m
            ON c.moment_id = m.id
            LEFT JOIN users u
            ON u.id = c.user_id
            LEFT JOIN avatar a
            ON c.user_id = a.user_id
            WHERE m.id = ?
        `
        const [result] = await connection.execute(statement, [momentId])
        return result
    }
}

module.exports = new CommentServices()