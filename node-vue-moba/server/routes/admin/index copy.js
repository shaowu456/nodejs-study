module.exports = app => {
  const express = require('express')

  const router = express.Router() // nodejs 子路由对象
  
  const Category = require('../../models/Category')
  // 新增分类
  router.post('/categories',async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })
  // 修改分类
  router.put('/categories/:id',async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id,req.body) //req.body 要修改的部分
    res.send(model)
  })
  // 删除分类
  router.delete('/categories/:id',async (req, res) => {
    console.log('xxxxxx:' + req)
    const model = await Category.findByIdAndDelete(req.params.id,req.body) //req.body 要修改的部分
    res.send(model)
  })
  router.get('/categories',async (req, res) => {
    const items = await Category.find().populate('parent').limit(10)  // 关联查询parent
    // const items = await Category.find().limit(10)  // 关联查询parent
    res.send(items)
  })
  router.get('/categories/:id',async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })
  app.use('/admin/api',router) // 挂载子路由
  // 错误处理函数
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}