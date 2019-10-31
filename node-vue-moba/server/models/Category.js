// 建立 目录 模型
const mongoose = require('mongoose')

// 创建模型 构建其属性
const schema = new mongoose.Schema({  
  name: { type: String },
  // parent: { type: String}
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' } //mongoose.SchemaTypes.ObjectId 表示芒果数据库里id ref关联的mongoose模型
})

//模型导出
module.exports = mongoose.model('Category', schema)