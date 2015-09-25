/*
  路由跟视图在一起，但业务逻辑要拿出去吗

*/
'use strict';

var views = require('co-views');
var router = require('koa-power-router/router')

let render = views(__dirname + '/views/', {default: 'jade'})

router.get('/', function*(next) {
  // 判断分支
  // 判断登录
  // 登录过显示欢迎页；否则返回登陆页
  this.body = yield render('index.jade', {})

});

router.get('/login', function*(next) {
  // 输入用户名、密码
    this.body = yield render('login.jade', {})
});

router.get('/register', function*(next) {
  this.body = 'register'
});

// 捕获 404
router.on('404', function* () {
  this.body = yield render('404.jade', {})
})

module.exports = router;
