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
    cb(null, false);
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
  upload(req, res, (err) => {
    let { name, npm, password } = req.body
    let genId = npm + uuid()
    
    //Check error in upload middleware
    if(err){
      console.log(err)
      return utils.template_response(res, 500, err.message , null)
    } 
    //Check Fields
    if (!name || !npm || !password || !req.file) {
      return utils.template_response(res, 400, "All fields need to be filled in" , null)
    }
    //Check min NPM
    if(npm.length<12) {
      return utils.template_response(res, 422, "NPM is incorrect. Require min 12 digits" , null)
    }
    //Check if npm is already registered
    let findUser = `SELECT npm FROM users where role="user" && npm='${npm}'`;
    db.query(findUser, asyncHandler(async(err, data)=>{
      if (err) console.log(err.response)
      if(data.length>0){
        return utils.template_response(res, 422, "NPM is already registered" , null)
      }
      password = await bcrypt.hash(password, 10)
      let post = {
        id: genId, 
        name: name, 
        npm: npm, 
        ktm_url: req.file.path, 
        password: password
      }
      let sql = 'INSERT INTO users SET ?'
      db.query(sql, post, (err, result)=>{
        if (err){
          console.log(err)
          utils.template_response(res, 400, "Failed to register", null)
        }
        console.log('success')
        utils.template_response(res, 200, "Registered Sucessfully", null)
      })
    }))
  })
})

module.exports = router;