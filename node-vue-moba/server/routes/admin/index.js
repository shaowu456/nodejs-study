module.exports = app => {
  const express = require('express')

  const router = express.Router({ // nodejs 子路由对象
    mergeParams: true
  })
  
  // const Category = require('../../models/Category')
  // 新增分类
  router.post('/',async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 修改分类
  router.put('/:id',async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body) //req.body 要修改的部分
    res.send(model)
  })
  // 删除分类
  router.delete('/:id',async (req, res) => {
    console.log('xxxxxx:' + req)
    const model = await req.Model.findByIdAndDelete(req.params.id,req.body) //req.body 要修改的部分
    res.send(model)
  })
  router.get('/',async (req, res) => {
    // const modelName = require('inflection').classify(req.params.resource)
    // const Model = require(`../../models/${modelName}`)  将其写成中间件
    const queryOptions = {}
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(20)  // 关联查询parent
    // const items = await req.Model.find().limit(10)  // 关联查询parent
    res.send(items)
  })
  router.get('/:id',async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  app.use('/admin/api/rest/:resource', async (req,res,next) => {
    //中间件 该出为每个/admin/api/rest/  的req加了属性Model
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router) // 挂载子路由
  // 错误处理函数
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}