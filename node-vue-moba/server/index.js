const express = require('express')

const app = express()

//引入中间件
// app.use(require('cors'))
// app.use(express.json())

app.use(require('cors')())
app.use(express.json())
require('./plugins/db')(app)  //这是一个函数 执行它并把 app传进去
require('./routes/admin')(app)  //这是一个函数 执行它并把 app传进去

app.get('/', function (req, res) {
  res.send('Hello World');
})

var server = app.listen(3000,()=>{
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
var http = require('http');
// http.createServer(function (request, response) {

//   // 发送 HTTP 头部 
//   // HTTP 状态值: 200 : OK
//   // 内容类型: text/plain
//   response.writeHead(200, {'Content-Type': 'text/plain'});

//   // 发送响应数据 "Hello World"
//   response.end('Hello World\n');
// }).listen(3000);