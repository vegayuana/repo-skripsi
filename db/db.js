// const mysql = require('mysql') 

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.MYSQL_DB,
//   timezone: 'UTC+0'
// });
// module.exports = db

const { Client } = require('pg')
const db = new Client({
  user: "rkozpdtobuxmkm",
  password: "dad110039e8db007c41986844b637c7935222471671881386969828d0b3930c1",
  database: "d7uaeug53c7bd5",
  port: 5432,
  host: "ec2-3-234-169-147.compute-1.amazonaws.com",
  ssl: true,
  dialect: 'postgres',
  timezone: 'UTC+0'
})
module.exports = db