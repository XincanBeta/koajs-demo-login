/*
  对 app 封装一些方法
  或再次引用别的资源


*/

require('./env')

var koa = require('koa');
var app = koa();

module.exports = app;

