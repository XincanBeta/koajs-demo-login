介绍：
用 koajs 框架实现登录

src 目录结构：
public：存放静态资源（一般意义上的前端代码）

环境问题：
工程运行参看 package.json ，babel 运行时可能会提示 jade 性能问题，但时而渲染 jade 性能又可以恢复正常

准备阶段任务：
* 熟悉 git
* 探索 git flow

完成指标：
* 测试驱动，记住用 mocha 命令运行
* 数据存入 mysql 中
* jade 结合 koa
* 路由
* 用户密码加密（是否无法解密，只能判断 hash 值）
* session、cookie；sessionid
* 容错机制
* 监听在线用户数目

需求罗列：
* 判断用户是否登录，没有则跳转到登录
* 用户注册存入数据库
* 用户登录到数据库中匹配

npm 包的变更：
koa-power-router 替代 koa-router

===
预告：
接下来的工程
1、即时聊天，并存储数据
2、用 webservice 与 java 通信


