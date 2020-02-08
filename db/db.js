const mysql = require('mysql') 
const db = mysql.createPool(
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.MYSQL_DB,
  // timezone: 'UTC+0',
  // uri:'mysql://b603329b79d710:1c769385@us-cdbr-iron-east-04.cleardb.net/heroku_0d41974a8e076cc?reconnect=true'
  process.env.CLEARDB_DATABASE_URL
)
module.exports = db