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
module.exports = router;