const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const crypto = require('crypto')
const uuid = require('uuid/v4');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'repository'
});

//connect db 
db.connect((err)=>{
  if(err){
    throw err;
  }
  console.log("Mysql Connected...")
})

//Register
router.post('/register', (req, res) =>{  
  let { name, npm, password, ktm_url } = req.body;  
  var genId = npm + uuid();
  console.log(req.body)

  if (name && npm && ktm_url && password) {
    password = crypto.createHash('md5').update(password).digest("hex");
    let post = {id: genId, is_active: false, role: '1', name: name, npm: npm, ktm_url: ktm_url, password: password}
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, post, (err, result)=>{
      if (err) throw err;
      console.log(result);
      res.send("User Registered Sucessfully")
    })
  } else {
    return res.send("Please Fill All Fields")
  }
});

module.exports = router;
