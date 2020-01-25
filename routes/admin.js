const express = require('express')
const router = express.Router()
const utils = require('../utils/templates')

//connect DB
const db = require('../db/db')
require('../db/connection')

//Show User Acc
router.get('/show-acc', (req, res) =>{  
  let sql = 'SELECT * FROM USERS WHERE role = "user"'
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result)
  })
})

//Verification
router.put('/verified/:id', (req, res) =>{  
  const id = req.params.id
  let sql = `UPDATE users SET is_active=${true}, processed_at=NOW() where id='${id}'`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
  })
})

//Unverified
router.put('/unverified/:id', (req, res) =>{  
  const id = req.params.id
  let sql = `UPDATE users SET is_active= ${false}, processed_at=NOW() where id='${id}'`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
  })
})

//Show Skripsi
router.get('/show-skripsi', (req, res) =>{  
  let sql = `SELECT skripsi.id, skripsi.user_id, skripsi.title, skripsi.published_year, skripsi.abstract, skripsi.file_url, skripsi.uploaded_at, skripsi.processed_at, skripsi.is_approved, users.name 
            FROM skripsi join users where skripsi.user_id = users.id`;
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result)
  })
})

//Approve Skripsi
router.put('/approved/:id', (req, res) =>{  
  const id = req.params.id
  let sql = `UPDATE skripsi SET is_approved=${true}, processed_at=NOW() where id='${id}'`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
  })
})

//Unpproved Skripsi
router.put('/unapproved/:id', (req, res) =>{  
  const id = req.params.id
  let sql = `UPDATE skripsi SET is_approved=${false}, processed_at=NOW() where id='${id}'`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
  })
})

module.exports = router;