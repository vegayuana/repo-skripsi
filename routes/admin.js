const express = require('express')
const router = express.Router()
const utils = require('../utils/templates')

//connect DB
const db = require('../db/db')
require('../db/connection')

//Show User Acc
router.get('/show-acc', (req, res) =>{  
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

//Show Skripsi
router.get('/show-skripsi', (req, res) =>{  
  let sql = `SELECT skripsi.id, skripsi.user_id, skripsi.title, skripsi.published_year, skripsi.category, skripsi.file_url, skripsi.created_at,  skripsi.is_approved, users.name 
            FROM skripsi join users where skripsi.user_id = users.id`;
    db.query(sql, (err, result)=>{
      if (err) console.log(err);
      console.log(result);
      res.send(result)
    })
})

//Approve Skripsi
router.put('/approved/:id', (req, res) =>{  
  const id = req.params.id
  console.log(id)
  let sql = `UPDATE skripsi SET is_approved=${true} where id='${id}'`;
    db.query(sql, (err, result)=>{
      if (err) console.log(err)
    })
});

//Unpproved Skripsi
router.put('/unapproved/:id', (req, res) =>{  
  const id = req.params.id
  console.log(id)
  let sql = `UPDATE skripsi SET is_approved=${false} where id='${id}'`;
    db.query(sql, (err, result)=>{
      if (err) console.log(err)
    })
});



module.exports = router;