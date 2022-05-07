const {
    checkLableExists,
    create
} = require('../services/label.services.js')
const verifyLableExists = async (ctx, next) => {
    // 判断添加的标签是否已有
    const { lables } = ctx.request.body
    const newLable = []
    for (let name of lables) {
        const res = await checkLableExists(name)
        const lable = { name }
        if (!res.length) {
            // 标签不存在
            const res = await create(name)
            lable['id'] = res.insertId
        } else {
            lable['id'] = res[0].id
        }
        newLable.push(lable)
    }
    ctx.lables = newLable
    await next()
}
module.exports = {
    verifyLableExists
}