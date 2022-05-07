const multer = require('koa-multer')
const jimp = require('jimp')
const path = require('path')

const avatarUpload = multer({
    dest: path.resolve(__dirname, '../uploads')
})
const handlerAvatar = avatarUpload.single('avatar')
const pictureUpload = multer({
    dest: path.resolve(__dirname, '../uploads/pictures')
})
const handlerPicture = pictureUpload.array('picture', 9)
const pictureResize = async (ctx, next) => {
    const files = ctx.req.files
    // 在不需要展示原图大小的时候依然请求原图资源然后设置大小其实比较浪费流量，所以这里对每个配图写入三种不同规格的大小形式
    // 没有对这种形式的图片编写接口，只有原图接口
    for (let file of files) {
        const writepath = path.join(file.destination, file.filename)
        jimp.read(file.path).then((image) => {
            image
                .resize(1280, jimp.AUTO)
                .write(`${writepath}-large`)
                .resize(640, jimp.AUTO)
                .write(`${writepath}-middle`)
                .resize(320, jimp.AUTO)
                .write(`${writepath}-small`)
        })
    }
    try {
       await next()
    } catch (err) {
        ctx.body = '未知错误'
        console.log(err.message)
    }
}

module.exports = {
    handlerAvatar,
    handlerPicture,
    pictureResize
}