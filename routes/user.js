const express = require('express')
const router = express.Router()
const utils = require('../utils/templates')
var jwt = require('json-web-token')
var secret = "repository.secret"

//connect DB
const db = require('../db/db')
require('../db/connection')

//Get profile 
router.get('/profile', (req, res) =>{  
  let token = req.headers.authorization
  let payload={}
  jwt.decode(secret, token, function (err, decodedPayload, decodedHeader) {
    payload=decodedPayload.request
  })
  console.log(payload.id)
  let sql =`SELECT * FROM users WHERE id='${payload.id}'`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result)
  })
})
//edit password 
router.post('/edit-pass', (req, res) =>{  
  
})
//get status skripsi 
router.get('/skripsi', (req, res) =>{  
  let token = req.headers.authorization
  let payload={}
  jwt.decode(secret, token, function (err, decodedPayload, decodedHeader) {
    payload=decodedPayload.request
  })
  let sql =`SELECT * FROM skripsi WHERE user_id='${payload.id}' LIMIT 1`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result[0])
  })
})

//upload skripsi
// router.get('/', (req, res) =>{  
  // let id = req.params.id
  // let sql = `SELECT skripsi.id, skripsi.user_id, skripsi.title, skripsi.abstract, skripsi.file_url, skripsi.published_year, skripsi.category, users.name 
  //             FROM skripsi join users on users.id = skripsi.user_id where skripsi.is_approved=${1} and skripsi.id='${id}' limit 1`
  // db.query(sql, (err, result)=>{
  //   if (err) console.log(err)
  //   res.send(result)
  // })
// })

module.exports = router;