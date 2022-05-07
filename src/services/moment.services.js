const connection = require('../app/database.js')

class MomentServices {
    async create(content, user_id) {
        const statement = `INSERT INTO moment (user_id, content) VALUES(?, ?)`
        const res = await connection.execute(statement, [user_id, content])
        return res[0]
    }
    async getDetail(moment_id) {
        const statement = `
            SELECT m.id momentId, m.content, m.createAt, m.updateAt, JSON_OBJECT('userId', u.id, 'name', u.name, 'avatar', aua.avatar_url) author,
                (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
                IF(COUNT(c.id), JSON_ARRAYAGG(
                    JSON_OBJECT('id', c.id, 'content', c.content, 'createAt', c.createAt, 'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatar', ca.avatar_url))
                ), NULL) comments,
                IF(COUNT(l.id), JSON_ARRAYAGG(
                    JSON_OBJECT('id', l.id, 'name', l.name)
                ), NULL) lables,
                (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8001/moment/images/', file.filename)) FROM file WHERE file.moment_id = m.id) images
            FROM moment m
            LEFT JOIN users u
            ON m.user_id = u.id
            LEFT JOIN comment c
            ON c.moment_id = m.id
            LEFT JOIN users cu
            ON cu.id = c.user_id
            LEFT JOIN moment_lable ml
            ON ml.moment_id = m.id
            LEFT JOIN lable l
            ON ml.lable_id = l.id
            LEFT JOIN avatar aua
            ON aua.user_id = m.user_id
            LEFT JOIN avatar ca
            ON ca.user_id = c.user_id
            WHERE m.id = ?
        `
        const res = await connection.execute(statement, [moment_id])
        return res[0][0]
    }
    async getAll(offset, size) {
        const statement = `
            SELECT
                m.id, m.content, m.createAt, m.updateAt,
                JSON_OBJECT('id', u.id, 'name', u.name, 'avatar_url', aua.avatar_url) author,
                (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
                IF(COUNT(c.id), JSON_ARRAYAGG(
                    JSON_OBJECT('id', c.id, 'content', c.content, 'createAt', c.createAt,
                        'user', JSON_OBJECT('uid', cu.id, 'name', cu.name, 'avatar_url', ca.avatar_url)
                    )
                ), NULL) comments,
                IF(COUNT(l.id), JSON_ARRAYAGG(
                    JSON_OBJECT('id', l.id, 'name', l.name)
                ), NULL) lables
            FROM moment m
            LEFT JOIN users u ON m.user_id = u.id
            LEFT JOIN comment c ON c.moment_id = m.id
            LEFT JOIN users cu ON cu.id = c.user_id
            LEFT JOIN moment_lable ml
            ON ml.moment_id = m.id
            LEFT JOIN lable l
            ON l.id = ml.lable_id
            LEFT JOIN avatar aua
            ON aua.user_id = m.user_id
            LEFT JOIN avatar ca
            ON ca.user_id = c.user_id
            GROUP BY m.id
            LIMIT ?, ?
        `
        const res = await connection.execute(statement, [offset, size])
        return res[0]
    }
    async update(mid, content) {
        const statement = `
            UPDATE moment SET content = ? WHERE id = ?
        `
        const res = await connection.execute(statement, [content, mid])
        return res[0]
    }
    async delMoment(mid) {
        const statement = `
            DELETE FROM moment WHERE id = ?
        `
        const res = await connection.execute(statement, [mid])
        return res[0]
    }
    async getImages(filename) {
        const statement = `
            SELECT * FROM file WHERE filename = ?
        `
        const [res] = await connection.execute(statement, [filename])
        return res[0]
    }
}

module.exports = new MomentServices()