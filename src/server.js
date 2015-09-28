/*
  第一版
  
*/
'use strict';

var koa = require('koa');
var router = require('./router')
var session = require('./session');

var app = koa();


app.keys = ['secret key here']; // cookie 签名
app.use(session());

app.use(router())

app.listen(3000)
