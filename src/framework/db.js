var mysql = require('mysql');

module.exports = {
  getConnection: function() {
    return mysql.createConnection({
      host: 'localhost',
      port: 3306,
      database: 'test',
      user: 'admin',
      password: 'admin'
    });
  }
}

