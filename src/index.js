/*
  
*/
'use strict';

var http = require('http')
var app = require('./framework/main'); 
var router = require('./framework/router/router');
var session = require('./framework/session');

var serve = require('koa-static')
var socketIo = require('socket.io') // io 利用事件机制来通信
// var question = require('./module/question')

let server, io

app.keys = ['secret key here']; // cookie 签名

app.use(serve(__dirname + '/public'))
app.use(session());
app.use(router())



// app.listen(3000) // 这种启动方式无法扩展


server = http.Server(app.callback());

io = socketIo(server);

server.listen(3000)

