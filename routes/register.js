const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const uuid = require('uuid/v4');
const utils = require('../utils/templates')
const asyncHandler = require('express-async-handler')
const { check, validationResult } = require('express-validator');
//connect DB
const db = require('../db/db')
require('../db/connection') 

//Register
router.post('/register', [check('npm').isLength({ min: 12 })], (req, res) =>{
  let { name, npm, password, ktm_url } = req.body
  let genId = npm + uuid()
  const errors = validationResult(req);

  //validate request
  if (!name || !npm || !ktm_url || !password) {
    return utils.template_response(res, 400, "All fields need to be filled in" , null)
  }
  //check if npm is already registered
  let findUser = `SELECT npm FROM users where role="user" && npm=${npm}`;
  db.query(findUser, asyncHandler(async(err, data)=>{
    if (err) console.log(err)
    if(data.length>0){
      return utils.template_response(res, 422, "NPM is already registered" , null)
    }
    else{
      if(!errors.isEmpty()) {
        return utils.template_response(res, 422, "NPM is incorrect. Require min 12 digits" , null)
      }
      password = await bcrypt.hash(password, 10)
      let post = {
        id: genId, 
        name: name, 
        npm: npm, 
        ktm_url: ktm_url, 
        password: password
      }
      let sql = 'INSERT INTO users SET ?'
      db.query(sql, post, (err, result)=>{
        if (err){
          console.log(err)
          utils.template_response(res, 400, "Failed to register", null)
        }
        utils.template_response(res, 200, "Registered Sucessfully", null)
      })
    }
  }))
})
module.exports = router;