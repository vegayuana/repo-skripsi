// var express = require('express');
// var router = express.Router();
// var mysql = require('mysql')

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'repository'
// });

// //connect db 
// db.connect((err)=>{
//   if(err){
//     throw err;
//   }
//   console.log("Mysql Connected...")
// })

// //Upload
// router.post('/upload', (req, res) =>{  
//   var reqBody = req.body
//   var { id, , password, ktm_url } = req.body;  
//   console.log(req.body)

//   if (name && npm && ktm_url && password) {
//     req.body.password = crypto.createHash('md5').update(reqBody.password).digest("hex");
//     let post = {is_active: false, role: '1', name: reqBody.name, npm: reqBody.npm, ktm_url: reqBody.ktm_url, password: reqBody.password}
//     let sql = 'INSERT INTO users SET ?';
//     db.query(sql, post, (err, result)=>{
//       if (err) throw err;
//       console.log(result);
//       res.send("User Registered Sucessfully")
//     })
//   } else {
//     return res.send("Please Fill All Fields")
//   }
// });

// module.exports = router;
