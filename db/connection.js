var mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit:10,
  password:'',
  user:'',
  database:'',
  host: 'localhost',
  port:'3000'
})

module.exports = conn;