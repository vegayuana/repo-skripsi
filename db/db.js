const mysql = require('mysql') 

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.MYSQL_DB,
//   timezone: 'UTC+0'
// });
const db = mysql.createConnection({
  host: 'ec2-3-234-169-147.compute-1.amazonaws.com',
  user: 'rkozpdtobuxmkm',
  port: '5432',
  password: 'dad110039e8db007c41986844b637c7935222471671881386969828d0b3930c1',
  database: 'd7uaeug53c7bd5',
  dialect: 'postgres',
  timezone: 'UTC+0'
});
module.exports = db