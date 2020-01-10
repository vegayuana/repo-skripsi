const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const uuid = require('uuid/v4');
// const jwt = require('jsonwebtoken');

//connect DB
const db = require('../db/db')
require('../db/connection')

//Register
router.post('/register', async (req, res) =>{  
  try{
    console.log(req.body)
   
    let { name, npm, password, ktm_url } = req.body;
    let genId = npm + uuid();
  
    if (name && npm && ktm_url && password) {
      password = await bcrypt.hash(password, 10);
      let post = {
        id: genId, 
        is_active: false, 
        role: '1', 
        name: name, 
        npm: npm, 
        ktm_url: ktm_url, 
        password: password
      }
      let sql = 'INSERT INTO users SET ?';
      db.query(sql, post, (err, result)=>{
        if (err) console.log(err);
        console.log(result);
        res.send("Registered Sucessfully")
      })
    } else {
      return res.send("Please Fill In All Fields")
    }
  }catch(err){
    res.status(500).send()
  }
});

//Login 
router.post('/login', async (req, res) =>{
  try{
    const findUser ='SELECT * FROM users WHERE npm='+req.body.npm;
    db.query(findUser,async (err, result)=>{
      if(!err) {
        if(await bcrypt.compare(req.body.password, result[0].password)) {
          return res.json({user: result[0], login: true})
        } else {
          return res.json({login: false})
        }
      } else {
        res.json({err})
      }
    })
  }catch (err){
    res.status(500).send()
  }
});

  //JWT

  // const user = { id: 3};
  // const token=  jwt.sign({user}, 'my_secret_key');
  // res.json({
  //   token:token
  // })

  // jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
  //   res.json({
  //     token
  //   });
  // });

//Show User 
router.get('/show', (req, res) =>{  
  let sql = 'SELECT * FROM USERS WHERE role = 1';
    db.query(sql, (err, result)=>{
      if (err) console.log(err);
      console.log(result);
      res.send(result)
    })
});

//Verification
router.put('/update/:id', (req, res) =>{  
  const id = req.params.id;
  console.log(id)
  let sql = `UPDATE users SET is_active=${true} where id='${id}'`;
    db.query(sql, (err, result)=>{
      if (err) console.log(err);
      console.log(result);
      // res.send(req.body)
      res.json({"updated": true})
    })
});

//Unverified
router.put('/delete/:id', (req, res) =>{  
  const id = req.params.id;
  let sql = `UPDATE users SET is_active= ${false} where id='${id}'`;
    db.query(sql, (err, result)=>{
      if (err) console.log(err);
      console.log(result);
      res.send("delete succes!")
    })
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