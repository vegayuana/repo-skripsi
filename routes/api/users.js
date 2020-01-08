const express = require('express');
const router = express.Router();

//Model
const User = require('../../models/User');

//CRUD 

//read
router.get('/', (req, res)=>{
  res.send('hello')
})


//Register

router.post('/', (req, res) =>{
  res.send('register');
});

module.exports = router;

// const { name, email, password } = req.body;

//   if (!name || !email || !password){
//     return res.status(400).json({ msg: 'Input semua field'})
//   }

//   User.findOne({ email})
//   .then(user => {
//     if(user) return res.status(400).json({
//       msg: 'User already exist'
//     })
//     const newUser = new User ({
//       name, email, password
//     }) 
//     //Hash
//   })