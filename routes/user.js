const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const utils = require('../utils/templates')
const uuid = require('uuid/v4')
const jwt = require('json-web-token')
const secret = "repository.secret"
const path = require('path')

//connect DB
const db = require('../db/db')
require('../db/connection')

//Get profile 
router.get('/profile', (req, res) =>{  
  let bearer = req.headers.authorization
  let token = bearer.split(' ')[1]
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
    let bearer = req.headers.authorization
    let token = bearer.split(' ')[1]
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
            return utils.template_response(res, 400, "The new password must be different from the old password", null)
          }
          else{
            let password = await bcrypt.hash(newPass, 10)
            let sql = `UPDATE users SET password='${password}' where id='${payload.id}'`
            db.query(sql, (err, result)=>{
              if (err) console.log(err)
              return utils.template_response(res, 200, "Changing Password Sucessfully", null)
            })
          }
        }
        else{
          return utils.template_response(res, 400, "Old password does not match the database", null)
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
  let bearer = req.headers.authorization
  let token = bearer.split(' ')[1]
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
    cb(null, uuid() + 'skripsi' + path.extname(file.originalname))
  }
})
//Check Image type
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true)
  } else {
    let err={
      message:'File must be pdf'
    }
    cb(err, false)
  }
}
//Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1024 * 1024* 20}, 
  fileFilter:fileFilter
}).single('file')

// upload skripsi
router.post('/upload/', (req, res) =>{  
  upload(req, res, (err) => {
    //Check error in upload middleware
    if(err){
      console.log(err)
      return utils.template_response(res, 500, err.message , null)
    } 
    //Check Fields
    let { title, year, abstract, category, keywords} = req.body
    console.log(req.body)
    if (!title || !year || !abstract || !req.file) {
      return utils.template_response(res, 400, "All fields need to be filled in" , null)
    }
    //Get user id
    let bearer = req.get('Authorization')
    let token = bearer.split(' ')[1]
    let payload={}
    jwt.decode(secret, token, function (err, decodedPayload, decodedHeader) {
      payload=decodedPayload.request
    })
    //Check if user has uploaded 
    let checkSkripsi =`SELECT * FROM skripsi WHERE user_id='${payload.id}' LIMIT 1`
    db.query(checkSkripsi, (err, skripsi)=>{
      if (err){
        return utils.template_response(res, 400, err.response, null)
      }  
      if(skripsi.length>0){
        return utils.template_response(res, 422, "User has uploaded a file" , null)
      }
      let path_url = req.file.path
      let post = {
        id: uuid(), 
        user_id: payload.id,
        title: title,
        abstract: abstract,
        published_year: year, 
        file_url: path_url,
        category: category,
        keywords: keywords
      }
      let sql = 'INSERT INTO skripsi SET ?'
      db.query(sql, post, (err, result)=>{
        if(err){
          console.log(err)
          return utils.template_response(res, 500, err.message , null)
        } 
      console.log('success!')  
      return utils.template_response(res, 200, "Upload Successfully", null)
      })
    })   
  })
})

// upload skripsi
router.put('/reupload/', (req, res) =>{  
  upload(req, res, (err) => {
    //Check error in upload middleware
    if(err){
      console.log(err)
      return utils.template_response(res, 500, err.message , null)
    } 
    //Check Fields
    let { title, year, abstract, category, keywords} = req.body
    console.log(req.body)
    if (!title || !year || !abstract || !req.file) {
      return utils.template_response(res, 400, "All fields need to be filled in" , null)
    }
    //Get user id
    let bearer = req.get('Authorization')
    let token = bearer.split(' ')[1]
    let payload={}
    jwt.decode(secret, token, function (err, decodedPayload, decodedHeader) {
      payload=decodedPayload.request
    })
    //Check if user has uploaded 
    let checkSkripsi =`SELECT * FROM skripsi WHERE user_id='${payload.id}' LIMIT 1`
    db.query(checkSkripsi, (err, skripsi)=>{
      if (err){
        return utils.template_response(res, 400, err.response, null)
      }  
      if(skripsi.length===0){
        return utils.template_response(res, 422, "User hasn't uploaded a file" , null)
      }
      if(skripsi[0].is_approve===1){
        return utils.template_response(res, 422, "File has been published" , null)
      }
      let id = skripsi[0].id
      let path_url = req.file.path
      let post = {
        title: title,
        abstract: abstract,
        published_year: year, 
        file_url: path_url,
        category: category,
        keywords: keywords
      }
      let sql = `UPDATE skripsi SET uploaded_at=NOW(), is_approved=${2}, ? where id='${id}'`
      db.query(sql, post, (err, result)=>{
        if(err){
          console.log(err)
          return utils.template_response(res, 500, err.message , null)
        } 
      console.log('success!')  
      return utils.template_response(res, 200, "Reupload Successfully", null)
      })
    })   
  })
})
module.exports = router