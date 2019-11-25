// 建立 目录 模型
const mongoose = require('mongoose')

// 创建模型 构建其属性
const schema = new mongoose.Schema({  
  name: { type: String },
  avatar: { type: String },
  phone: { type: String },
  sex: { type: String },
  age: { type: String },
  birthday: { type: String },
  address: { type: String },
  title: { type: String },
  histoyNakedR: { type: String },
  histoyNakedL: { type: String },
  wearGtypeR: { type: String },
  wearGtypeL: { type: String },
  visionR: { type: String },
  visionL: { type: String },
  correctVisionR: { type: String },
  correctVisionL: { type: String },
  eyePressR: { type: String },
  eyePressL: { type: String },
  eyePositionR: { type: String },
  eyePositionL: { type: String },
  threedEyeR: { type: String },
  threedEyeL: { type: String },
  colorFeelR: { type: String },
  colorFeelL: { type: String },
  eyeCheckR: { type: String },
  eyeCheckL: { type: String },
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
    createDate: { type: String },
    delay:{ type: String },
    cost:{ type: String },
    tips: { type: String }
  }],
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String }
})

//模型导出
module.exports = mongoose.model('Customer', schema)