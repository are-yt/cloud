const mysql = require('mysql2')
const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE
} = require('./config.js')

const connection = mysql.createPool({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
})

connection.getConnection((err, conn) => {
    conn.connect((err) => {
        if (err) {
            console.log(MYSQL_DATABASE + '数据库连接失败:' + err)
        } else {
            console.log(MYSQL_DATABASE + '数据库连接成功')
        }
    })
})

module.exports = connection.promise()