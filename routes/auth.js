const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')
const utils = require('../utils/templates')

//connect DB
const db = require('../db/db')
require('../db/connection') 

//Login 
router.post('/login', (req, res) =>{
  const findUser =`SELECT * FROM users WHERE npm='${+req.body.npm}'`;
  db.query(findUser,async (err, result)=>{
    try{
      //Check if user exist 
      if (result.length < 1){
        return utils.template_response(res, 400, "Account has not been registered" , null)
      }
      //Check is_active
      let user = result[0]
      if (user.is_active != 1){
        return utils.template_response(res, 400, "Account has not been activated. Please wait for admin to review", null)
      }
      //Compare Pass
      if( await bcrypt.compare(req.body.password, user.password)){ 
        //Generate Token 
        var payload = {
          "iss": "repository.apps",
          "aud": "world",
          "exp": 1592244331,
          "iat": 1400062400223,
          "typ": "repository",
          "request": {
            "id": user.id,
            "npm": user.npm,
            "role": user.role,
            "name": user.name,
          }
        }
        var secret = "repository.secret"
        jwt.encode(secret, payload, function (err, token) {
          if (err) {
            utils.template_response(res, 500, "internal api error", null)
          }
          utils.template_response(res, 200, "Login success", {token: token, isLogged:true, role:user.role})
        })
      }
      utils.template_response(res, 400, "Password does not match", {token: '', isLogged:false})
    }
    catch(err){
      utils.template_response(res, 500, "internal service error", null)
    }
  })
})
module.exports = router