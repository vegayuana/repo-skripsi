const express = require('express')
const router = express.Router()
const utils = require('../utils/templates')

//connect DB
const db = require('../db/db')
require('../db/connection')

//Show User Acc
router.get('/show', (req, res) =>{  
  let sql = 'SELECT * FROM USERS WHERE role = "user"';
    db.query(sql, (err, result)=>{
      if (err) console.log(err);
      console.log(result);
      res.send(result)
    })
});

//Verification
router.put('/verified/:id', (req, res) =>{  
  const id = req.params.id
  console.log(id)
  let sql = `UPDATE users SET is_active=${true} where id='${id}'`;
    db.query(sql, (err, result)=>{
      if (err) console.log(err)
    })
});

//Unverified
router.put('/unverified/:id', (req, res) =>{  
  const id = req.params.id
  let sql = `UPDATE users SET is_active= ${false} where id='${id}'`;
    db.query(sql, (err, result)=>{
      if (err) console.log(err)
    })
});


module.exports = router;