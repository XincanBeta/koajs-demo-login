/*
  1、如何接收 post 参数，与路由有关还是 koa 本身，还是要用 body 中间件解析
  2、

*/
'use strict';
var _ = require('lodash');
var views = require('co-views');
var parse = require('co-body');
var router = require('koa-power-router/router')
  // 控制器用来聚合业务逻辑
var Controller = require('koa-power-router/controller')
var db = require('../db');
let render = views(global.VIEW_PATH, {
  default: 'jade'
})

var user = new Controller({
  // 路由的处理函数就是 action
  beforeAction: function() {
    // 前置方法
  },
  login: function*() {
    if (this.method.toUpperCase() === 'GET') {
      this.body = yield render('login', {})
    } else {
      doLogin(this)
    }
  },
  register: function*() {
    if (this.method.toUpperCase() === 'GET') {
      this.body = yield render('register', {})
    } else {
      // 获取表单参数
      this.data = yield parse.form(this);
      // 存储数据库
      // 跳转链接
      yield doRegister(this)
    }
  }
})

function doLogin(ctx) {
  // 从数据库中比较
  // ctx.redirect('/')
}

function* doRegister(ctx) {
  var user = _.pick(ctx.data, ['username', 'password']);
  // 异步处理
  yield register(user);
  console.log('--------');
  // 更新 session
  ctx.session.user = user;
  ctx.session.active = true;
  ctx.redirect('/')
}

function register(user) {
  return new Promise(function(resolve, reject) {
    let connection = db.getConnection();
    connection.connect();
    connection.query('INSERT INTO user SET ?', user, function(err, result) {
      if (err) {
       throw err; 
      }
      connection.end();
      resolve(result)
      console.log(result);
    });
  })
}


module.exports = user;
