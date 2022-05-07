const {
    create,
    add,
    hasLable,
    getList
} = require('../services/label.services.js')
class LabelController {
    async create(ctx, next) {
        const { name } = ctx.request.body
        const res = await create(name)
        ctx.body = res
    }
    async add(ctx, next) {
        const lables = ctx.lables
        const { momentId } = ctx.params
        for (let lable of lables) {
            const res = await hasLable(momentId, lable.id)
            if (!res.length) {
                // 该动态不存在此标签，再将此标签添加到该动态
                await add(momentId, lable.id)
            }
        }
        ctx.body = 'ok'
    }
    async getList(ctx, next) {
        const { offset, size } = ctx.query
        console.log(offset, size)
        const res = await getList(offset, size)
        ctx.body = res
    }
}
module.exports = new LabelController()