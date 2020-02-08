const mysql = require('mysql') 
const db = mysql.createPool({
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'b603329b79d710',
  password: '1c769385',
  database: 'heroku_0d41974a8e076cc',
  timezone: 'UTC+0'
})
module.exports = db