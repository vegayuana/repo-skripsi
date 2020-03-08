const express = require('express')
const router = express.Router()

//connect DB
const db = require('../db/db')
require('../db/connection')

//show all skripsi
router.get('/list', (req, res) =>{  
  let sql = `SELECT skripsi.id, skripsi.title, skripsi.published_year, skripsi.category, skripsi.keywords, users.name 
              FROM skripsi join users on users.npm = skripsi.npm where is_approved=${1} 
              ORDER BY published_year desc`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result)
  })
})
router.get('/info', (req, res) =>{  
  let { id } = req.query
  console.log(id)
  let sql = `SELECT skripsi.id, skripsi.title, skripsi.abstract, skripsi.abstrak, skripsi.published_year, skripsi.category, skripsi.keywords, users.name 
              FROM skripsi join users on users.npm = skripsi.npm where skripsi.is_approved=${1} and skripsi.id='${id}' limit 1`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    console.log(result)
    res.send(result)
  })
})
module.exports = router