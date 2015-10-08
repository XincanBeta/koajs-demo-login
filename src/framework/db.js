var mysql = require('mysql-co');

module.exports = {
  getConnection: function() {
    return mysql.createConnection({
      database: 'test',
      user: 'admin',
      password: 'admin'
    });
  }
}
