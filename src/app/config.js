// 使用第三方库dotenv加载配置的env文件里的配置到process.env里面
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, '../keys', 'private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, '../keys', 'public.key'))

dotenv.config()

module.exports = {
    APP_PORT,
    APP_HOST,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
} = process.env
module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY