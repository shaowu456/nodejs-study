// 建立 目录 模型
const mongoose = require('mongoose')

// 创建模型 构建其属性
const schema = new mongoose.Schema({  
  name: { type: String },
  avatar: { type: String },
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  skills: [{
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String }
  }],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], // 顺风出装
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], // 逆风出装
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  patners: [{ //最佳搭档
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
    description: { type: String }
  }]

})

//模型导出
module.exports = mongoose.model('Hero', schema)