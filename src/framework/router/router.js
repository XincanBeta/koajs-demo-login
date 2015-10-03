/*
  知识点：
  1、实现重定向
  2、co-views 替代了 co-render ，支持 12 种模板引擎
    co-views 的路径问题

*/
'use strict';

var views = require('co-views');
var router = require('koa-power-router/router')

let user = require('./user')

let render = views(global.VIEW_PATH, {default: 'jade'})

router.get('/', function*(next) {
  // 判断登录
  if(!this.session.active){
    // 302 重定向，让浏览器直接跳转登录页面；get 请求
    this.redirect('/login')
    return;
  }
  // 登录过显示欢迎页；否则返回登陆页
  let user = this.session.user;
  this.body = yield render('index', user)
});

router.set('/login', ['get', 'post'], user.login)
router.set('/register', ['get', 'post'], user.register)

// 捕获 404
router.on('404', function* () {
  this.body = yield render('404', {})
})

module.exports = router;

