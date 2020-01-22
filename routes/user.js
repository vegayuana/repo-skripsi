const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const utils = require('../utils/templates')
var jwt = require('json-web-token')
var secret = "repository.secret"
const uuid = require('uuid/v4')

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
  let sql =`SELECT * FROM users WHERE npm='${payload.npm}' LIMIT 1`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result[0])
  })
})
//edit password 
router.put('/edit-pass', async(req, res) =>{  
  try{
    let token = req.headers.authorization
    let {newPass, oldPass} = req.body
    let payload={}
    jwt.decode(secret, token, function (err, decodedPayload, decodedHeader) {
      payload=decodedPayload.request
    })
    if(payload==={}){
      console.log('Need Login info')
      return 
    }
    let findOldPass = `SELECT password FROM users where id='${payload.id}' limit 1`
    db.query(findOldPass, async(err, result)=>{
      try{
        if( await bcrypt.compare(oldPass, result[0].password)){
          console.log('Old password matches the database')
          if (oldPass===newPass){
            utils.template_response(res, 400, "The new password must be different from the old password", null)
          }
          else{
            let password = await bcrypt.hash(newPass, 10)
            let sql = `UPDATE users SET password='${password}' where id='${payload.id}'`;
            db.query(sql, (err, result)=>{
              if (err) console.log(err)
              console.log('sukses diganti')
              utils.template_response(res, 200, "Changing Password Sucessfully", null)
            })
          }
        }
        else{
          console.log('not match')
          utils.template_response(res, 400, "Old password does not match the database", null)
        }
      }
      catch(err){
        console.log(err.response)
      }
    })
  }
  catch(err){
    console.log(err)
  }
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


//Multer : Handle Uploaded Files
const multer  = require('multer')

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: 'files/skripsi/',
  filename: function(req, file, cb){
    cb(null, Date.now() + file.originalname)
  }
})

//Check Image type
const fileFilter = (req, file, cb) => {
  // if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
  //   cb(null, true);
  // } else {
  //   cb(null, false);
  // }
}

//Init Upload
const upload = multer({
  storage: storage,
}).single('file')

// upload skripsi
router.post('/upload/:token', (req, res) =>{  
  
  let token = req.params.token
  let payload={}
  jwt.decode(secret, token, function (err, decodedPayload, decodedHeader) {
    payload=decodedPayload.request
  })
  upload(req, res, (err) => {
    console.log(payload.id)
  
    console.log(req.file)
    console.log(req.body)
    console.log(payload.id)

    let { title, year, abstract} = req.body
    let post = {
      id: uuid(), 
      user_id: payload.id,
      title: title,
      abstract: abstract,
      published_year: year, 
      file_url: req.file.path
    }

    let sql = 'INSERT INTO users SET ?'
    db.query(sql, post, (err, result)=>{
    if (err) console.log(err)
    res.send(result)
    })
  })
 
})

module.exports = router;