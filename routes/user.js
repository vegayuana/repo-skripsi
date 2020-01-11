const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const uuid = require('uuid/v4');
const jwt = require('json-web-token');
const utils = require('../utils/templates')

//connect DB
const db = require('../db/db')
require('../db/connection')

//Register
router.post('/register', async (req, res) =>{  
  try{
    let { name, npm, password, ktm_url } = req.body;
    let genId = npm + uuid();
  
    if (name && npm && ktm_url && password) {
      password = await bcrypt.hash(password, 10);
      let post = {
        id: genId, 
        is_active: false, 
        name: name, 
        npm: npm, 
        ktm_url: ktm_url, 
        password: password
      }
      let sql = 'INSERT INTO users SET ?';
      db.query(sql, post, (err, result)=>{
        if (err) console.log(err);
        utils.template_response(res, 200, "Registered Sucessfully", null)
      })
    } else {
      return utils.template_response(res, 400, "Please Fill In All Fields" , null)
    }
  }catch(err){
    return utils.template_response(res, 500, "internal service error" , null)
  }
});

//Login 
router.post('/login', async (req, res) =>{
  try{
    const findUser ='SELECT * FROM users WHERE npm='+req.body.npm;
    db.query(findUser,async (err, result)=>{
      try{
        //Check if user exist 
        if (result.length < 1){
          return utils.template_response(res, 400, "User not registered" , null)
        }
        //Check is_active
        let user = result[0]
        if (user.is_active != 1){
          return utils.template_response(res, 400, "Account not activated", null)
        }
        //Compare Pass
        if( await bcrypt.compare(req.body.password, user.password)) { 
          //Token 
          var payload = {
            "iss": "repository.apps",
            "aud": "world",
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
            utils.template_response(res, 200, "Login success", {token: token, login: true})
          })
        }
        utils.template_response(res, 400, "Password does not match", {token: '', login: false})
      }
      catch(err){
        utils.template_response(res, 500, "internal service error", null)
      }
    })
  }catch (err){
    utils.template_response(res, 500, "internal api error", null)
  }
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
// function verifyToken(req, res, next) {
//   // Get auth header value
//   const bearerHeader = req.headers['authorization'];
//   // Check if bearer is undefined
//   if(typeof bearerHeader !== 'undefined') {
//     // Split at the space
//     const bearer = bearerHeader.split(' ');
//     // Get token from array
//     const bearerToken = bearer[1];
//     // Set the token
//     req.token = bearerToken;
//     // Next middleware
//     next();
//   } else {
//     // Forbidden
//     res.sendStatus(403);
//   }
// }

module.exports = router;