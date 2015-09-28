/*
  基于 cookie 的 session ，并存储于内存中
  知识点：

*/

var _ = require('lodash');
  uid = require('uid-safe');

module.exports = function(options) {
  var store = {}; // store 的键值是 token ，且总是不同的
  var cookieName = 'koa.sid';
  var cookieOptions = {
    httpOnly: true,
    path: '/',
    overwrite: true,
    signed: true, // 让 app.keys 生效
    maxAge: 0.25 * 60 * 60 * 1000  // 15 分钟
  };

  function *loadSession(ctx){
    // 查看当前请求中是否存在 token
    var token = ctx.cookies.get(cookieName);
    // 在服务器端校验 token ，并获取会话
    if (token && _.has(store, token)) {
      ctx.session = store[token];
    };
    // 为客户端创建一个新会话
    if (!ctx.session) {
      ctx.session = {};
    };
    return token;
  }

  function *saveSession(ctx, token){
    // 真正初始化 session
    if (!token) {
      token = uid(24);
      // 在响应中增加 set-cookie 字段
      ctx.cookies.set(cookieName, token, cookieOptions);
      if (ctx.session) {
        store[token] = ctx.session;
      };
    }
    // 当 session 被销毁时（比如用户退出登录），清理 store 对象
    if (!ctx.session) {
      delete store[token]; 
    };
  }

  return function *session(next) {
    var token = yield loadSession(this)
    yield next; // 只有这个 yield 交出了控制权
    yield saveSession(this, token)
  }
}
