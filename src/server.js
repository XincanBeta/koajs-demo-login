/*
  第一版
  
*/
'use strict';

var koa = require('koa');
var router = require('./router')

var app = koa();

app.use(router())

app.listen(3000)
