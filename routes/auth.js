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
  let {npm, password} = req.body
  if ( !npm || !password){
    if (!npm && !password){
      return utils.template_response(res, 400, "NPM & password harus diisi" , null)
    }
    if(!npm){
      return utils.template_response(res, 400, "NPM harus diisi" , null)
    }
    else{
      return utils.template_response(res, 400, "Password harus" , null)
    }
  }
  
  const findUser =`SELECT * FROM users WHERE npm='${npm}'`
  db.query(findUser, npm, async (err, result)=>{
    try{
      //Check if user exist 
      if (result.length < 1){
        return utils.template_response(res, 400, "Akun belum terdaftar" , null)
      }
      //Check is_active
      let user = result[0]
      if (user.is_active != 1){
        return utils.template_response(res, 400, "Akun belum diaktifkan. Harap tunggu admin meninjau akun", null)
      }
      //Compare Pass
      if( await bcrypt.compare(password, user.password)){ 
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
          let bearer = 'Bearer ' + token
          if (err) {
            return utils.template_response(res, 500, "internal api error", null)
          }
          return utils.template_response(res, 200, "Login Berhasil", {token: bearer, isLogged:true, role:user.role})
        })
      }
      return utils.template_response(res, 400, "Password tidak cocok", {token: '', isLogged:false})
    }
    catch(err){
      return (err)
    }
  })
})
module.exports = router