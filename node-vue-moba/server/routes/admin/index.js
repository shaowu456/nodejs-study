module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const utils = require('../../lib/utils')
  const assert = require('http-assert')
  const router = express.Router({ // nodejs 子路由对象
    mergeParams: true
  })

  // const Category = require('../../models/Category')
  // 新增分类
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    console.log('~~~~~~~~~~~~~~~~~~~~')
    console.log(req.body)
    res.send(model)
  })
  // 修改分类
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body) //req.body 要修改的部分
    res.send(model)
  })
  // 删除分类
  router.delete('/:id', async (req, res) => {
    console.log('xxxxxx:' + req)
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body) //req.body 要修改的部分
    res.send(model)
  })
  // 资源列表
  router.get('/', async (req, res) => {
    // const modelName = require('inflection').classify(req.params.resource)
    // const Model = require(`../../models/${modelName}`)  将其写成中间件
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(20)  // 关联查询parent
    // const items = await req.Model.find().limit(10)  // 关联查询parent
    res.send(items)
  })

  // 资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  //登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  // const authMiddleware = require('../../middleware/auth2') //不校验
  //资源中间件
  const resourceMiddleware = require('../../middleware/resource')
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router) // 挂载子路由

  //加入处理文件的中间件
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })

  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    // file.url = `http://localhost:3000/uploads/${file.filename}`
    file.url = `http://111.231.100.197/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1.根据用户名找用户
    // const AdminUser = require('../../models/AdminUser')
    const user = await AdminUser.findOne({
      username: username
    }).select('+password')// + 表示 查的时候顺便查出password
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    console.log(user)
    // if(!user){
    //   return res.status(422).send({
    //     message:'用户不存在'
    //   })
    // }
    if (!user && username == 'superadmin') {
      //如果超管账号不存在 则直接创建
      let obj = { username: 'superadmin', password: '123456' }
      await require(`../../models/AdminUser`).create(obj)
      assert(user, 422, '超管账号不存在，正在创建中，请稍后重试')
    }
    assert(user, 422, '用户不存在')
    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send(Object.assign({}, { token }, user))
  })
  // 查询上级分类为固定值的资源列表
  app.get('/admin/api/findListByParent/:id', authMiddleware(), async (req, res) => {
    const parentId = req.body
    const Model = require(`../../models/Category`)
    const queryOptions = {}
    // const temp = req.body
    if (Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await Model.find({ parent: req.params.id }).limit(20)  // 关联查询parent
    // const items = await req.Model.find({name:/天/}).limit(10)  // 关联查询parent
    res.send(items)
  })
  // 查询带模糊姓名的顾客列表
  app.post('/admin/api/findCustomers', authMiddleware(), async (req, res) => {
    const {pageIndex, pageSize, name, phone } = req.body
    const Model = require(`../../models/Customer`)
    const items = await Model.find({
      name: new RegExp(name),
      phone: new RegExp(phone)
    }).skip((pageIndex-1) * pageSize).limit(pageSize)  // 关联查询parent
    items.forEach(item => {
      item.age = item.birthday&&utils.jsGetAgeByBirth(item.birthday) || ''
    })
    const count = await Model.where({
      name: new RegExp(name),
      phone: new RegExp(phone)
    }).count()
    let result = {
      count,
      items
    }
    res.send(result)
  })
  // 错误处理函数
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}