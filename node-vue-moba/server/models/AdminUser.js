// 建立 管理员 模型
const mongoose = require('mongoose')
// 创建模型 构建其属性
const schema = new mongoose.Schema({
  username: { type: String },
  // password: { type: String }
  password: {
    type: String,
    select: false, // 查询不返回
    set(val) {
      return require('bcrypt').hashSync(val, 9) //调用bcrypt模块的加密方法，10位加密指数，越大密码越复杂
    }
  }
})

//模型导出
module.exports = mongoose.model('AdminUser', schema)