/*
  目标：
  1、通过 mocha 测试 mysql 的基本功能
  2、熟悉 node 调用 mysql 的方式

  知识点：
  0、用 mocha 执行，否则会报错 ReferenceError: describe is not defined
  1、it 中必须包含 assert，哪怕在空判断

*/
var assert = require('assert');
var mysql = require('mysql');

function getConnection(){
  return mysql.createConnection({
      host: 'localhost',
      port: 3306,
      database: 'test',
      user: 'admin',
      password: 'admin'
    });
}

describe('Mysql ', function() {
  var connection;
  // 传入 done 参数，表示 mocha 处理异步代码
  it('should connects to database', function(done) {
    // 通过 query 隐式建立连接
    connection = getConnection();
    connection.connect();
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;
      assert(rows[0].solution == 2); 
      connection.end();
      done()
    });
  })

  it('should assign an id after being saved', function(done) {
    connection = getConnection();
    connection.connect();
    connection.query('INSERT INTO user SET ?', {username: 'chao', password: '123'}, function(err, result) {
      if (err) throw err; 
      // console.log(result);
      /*
        { fieldCount: 0,
          affectedRows: 1,
          insertId: 2,
          serverStatus: 2,
          warningCount: 0,
          message: '',
          protocol41: true,
          changedRows: 0 }
      */
      assert(result.insertId)
      connection.end();
      done();
    });
  })

 
})
