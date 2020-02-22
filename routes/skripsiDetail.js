const express = require('express')
const router = express.Router()

//connect DB
const db = require('../db/db')
require('../db/connection')

//show spesific skripsi 
router.get('/detail/', (req, res) =>{  
  let { id } =  req.query
  let sql = `SELECT skripsi.id, skripsi.user_id, skripsi.title, skripsi.abstract, skripsi.file_url, skripsi.published_year, skripsi.category, skripsi.keywords, users.name 
              FROM skripsi join users on users.id = skripsi.user_id where skripsi.is_approved=${1} and skripsi.id='${id}' limit 1`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result)
  })
})

router.get('/download/', (req, res) =>{  
  let { filePath } = req.query
  console.log('file yg dikirim', filePath)
  const file = `${filePath}`
  console.log('file', file)
  res.download(file)
})


module.exports = router