const express = require('express')
const router = express.Router()
const utils = require('../utils/templates')

var path = require('path')

//connect DB
const db = require('../db/db')
require('../db/connection')

//show spesific skripsi 
router.get('/detail/', (req, res) =>{  
  let { id } =  req.query;
  console.log('ini test', id)
  let sql = `SELECT skripsi.id, skripsi.user_id, skripsi.title, skripsi.abstract, skripsi.file_url, skripsi.published_year, skripsi.category, skripsi.keywords, users.name 
              FROM skripsi join users on users.id = skripsi.user_id where skripsi.is_approved=${1} and skripsi.id='${id}' limit 1`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result)
  })
})
//download file
router.get('/download/', (req, res) =>{  
  let { filePath } = req.query;
  console.log(filePath)
  const file = path.join(__dirname, '../', filePath)
  console.log(file)
  res.download(file)
})

module.exports = router;