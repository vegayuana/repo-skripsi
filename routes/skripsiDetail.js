const express = require('express')
const router = express.Router()

//connect DB
const db = require('../db/db')
require('../db/connection')

//show spesific skripsi 
router.get('/detail/', (req, res) =>{  
  let { id } =  req.query
  let sql = `SELECT skripsi.id, skripsi.title, skripsi.abstract, skripsi.abstrak, skripsi.file_url, skripsi.published_year, skripsi.category, skripsi.keywords, users.name 
              FROM skripsi join users on users.npm = skripsi.npm where skripsi.is_approved=${1} and skripsi.id='${id}' limit 1`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result)
  })
})

module.exports = router