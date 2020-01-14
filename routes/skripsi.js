const express = require('express')
const router = express.Router()
const utils = require('../utils/templates')

//connect DB
const db = require('../db/db')
require('../db/connection')

//show all skripsi
router.get('/list', (req, res) =>{  
  let sql = `SELECT skripsi.id, skripsi.user_id, skripsi.title, skripsi.published_year, skripsi.category, users.name 
              FROM skripsi join users on users.id = skripsi.user_id where is_approved=${1}`;
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result)
  })
})

//show spesific skripsi 
router.get('/detail/:id', (req, res) =>{  
  let id = req.params.id
  let sql = `SELECT skripsi.id, skripsi.user_id, skripsi.title, skripsi.abstract, skripsi.file_url, skripsi.published_year, skripsi.category, users.name 
              FROM skripsi join users on users.id = skripsi.user_id where skripsi.is_approved=${1} and skripsi.id='${id}' limit 1`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result)
  })
})

module.exports = router;


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
