/*
  第一版精简可控  
  
*/
'use strict';

var koa = require('koa');
var router = require('./router')

var app = koa();


app.use(router())

/*
app.use(function *(){
  var url = this.request.url;
  if (url === '/') {
    
  } else if (url === '/login') {
    
  } else if (url === '/register'){
    // 注册
    this.body = 'register'
  } else {
    this.status = 404;
    this.body = 'Can Not Found!'
  }
})*/

app.listen(3000)
