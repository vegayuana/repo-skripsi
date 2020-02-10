const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const uuid = require('uuid/v4')
const utils = require('../utils/templates')
const asyncHandler = require('express-async-handler')

//connect DB
const db = require('../db/db')
require('../db/connection') 

//Multer : Handle Uploaded Files
const multer  = require('multer')

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: 'files/ktm/',
  filename: function(req, file, cb){
    cb(null, Date.now() + file.originalname)
  }
})

//Check Image type
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
    cb(null, true);
  } else {
    let err={
      message:'File must be jpeg, jpg, or png'
    }
    cb(err, false);
  }
}

//Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1024 * 1024 * 5}, 
  fileFilter:fileFilter
}).single('ktm')

//Register
router.post('/register', (req, res) =>{
  upload(req, res, asyncHandler(async(err) => {
    let {name, npm, password } = req.body
    let genId = npm + uuid()
    console.log(req.file)
    console.log(req.body)
    if(err){
      return utils.template_response(res, 500, err.message , null)
    }
    if (!req.file){
      return utils.template_response(res, 500, 'File cannot be empty' , null)
    }
    password = await bcrypt.hash(password, 10)
    let data = {
      id: genId, 
      name: name, 
      npm: npm, 
      password: password,
      ktm_url:req.file.path
    }
    let sql = 'INSERT INTO users SET ?'
    db.query(sql, data, (err, result)=>{
      if (err){
        console.log('Failed',err)
        return utils.template_response(res, 400, "Failed to register", null)
      }
      console.log('Success')
      return utils.template_response(res, 200, "Registered Sucessfully", null)
    })
  }))
})

router.post('/check-form', (req, res) =>{
  let { name, npm, password } = req.body
  console.log(req.body)
  //Check Fields
  if (!name || !npm || !password ) {
    return utils.template_response(res, 400, "All fields need to be filled in" , null)
  }
  //Check min NPM
  if(npm.length<12 || npm.length>=15 ) {
    return utils.template_response(res, 422, "NPM is incorrect. Require number with 12-14 digits" , null)
  }
  //Check if npm is already registered
  let findUser = `SELECT npm FROM users where role='user' AND npm='${npm}'`;
  db.query(findUser,(err, data)=>{
    if (err) console.log(err.response)
    if(data.length>0){
      return utils.template_response(res, 422, "NPM is already registered" , null)
    }
    console.log('data valid')
    return utils.template_response(res, 200, "Data is valid", null)
  })
})

module.exports = router;