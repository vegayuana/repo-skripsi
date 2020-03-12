const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const uuid = require('uuid/v4')
const utils = require('../utils/templates')
const asyncHandler = require('express-async-handler')
const moment = require('moment')

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
    cb(null, true)
  } else {
    let err={
      message:'File harus jpeg, jpg, or png'
    }
    cb(err, false)
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
    let {name, npm, password, email } = req.body
    console.log(req.file)
    console.log(req.body)
    console.log(moment().add(30, 'minutes').format())
    if(err){
      return utils.template_response(res, 500, err.message , null)
    }
    if (!req.file){
      return utils.template_response(res, 500, 'File tidak boleh kosong' , null)
    }
    let encryptPassword = await bcrypt.hash(password, 10)
    let expired=moment().add(30, 'minutes').format()
    let data = {
      name: name,
      email:email, 
      npm: npm, 
      password: encryptPassword,
      ktm_url:req.file.path,
      created_at:moment().format(),
      token: uuid(),
      token_expired:expired
    }
    console.log(data)
    let sql = 'INSERT INTO temp_users SET ?'
    db.query(sql, data, (err, result)=>{
      if (err){
        console.log('Failed',err)
        return utils.template_response(res, 400, "Gagal register", null)
      }
      console.log('Success')
      var helper = require('sendgrid').mail;
      var from_email = new helper.Email('no-reply@repositori-skripsi.com');
      var to_email = new helper.Email(email);
      var subject = 'Email Verification!';
      var emailText=`<html>
      <body>
      <p>Halo ${name},</p>
      <p>Anda telah melakukan registrasi akun pada web aplikasi repositori-skripsi</p>
      <p>Mohon verifikasi email anda dengan menklik link berikut. link akan aktif selama 30 sejak email dikirim</p>
      <a href=${'https://repositori-skripsi.herokuapp.com/email-verification/'+data.token}>Verifikasi Email!</a>
      </body>
      </html>
      `
      var content = new helper.Content('text/html', emailText);
      var mail = new helper.Mail(from_email, subject, to_email, content);

      var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
      var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      });

      sg.API(request, function(error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
      });
      return utils.template_response(res, 200, "Email verifikasi telah dikirim", null)
    })
  }))
})

router.post('/check-form', (req, res) =>{
  let { name, npm, password, email } = req.body
  console.log(req.body)
  //Check Fields
  if (!name || !npm || !password || !email) {
    return utils.template_response(res, 400, "Semua field harus diisi" , null)
  }
  //Check min NPM
  if(npm.length<12 || npm.length>=15 ) {
    return utils.template_response(res, 422, "NPM salah. Memerlukan 12 digit" , null)
  }
  //check email 
  if(!email.includes('@') || !email.includes('.') ) {
    return utils.template_response(res, 422, "Email tidak valid" , null)
  }
  //Check if npm is already registered
  let findUser = `SELECT npm FROM users where role='user' AND npm='${npm}' or email='${email}'`
  db.query(findUser,(err, data)=>{
    if (err) console.log(err.response)
    console.log(data)
    if(data.length>0){
      return utils.template_response(res, 422, "NPM atau Email sudah pernah didaftarkan" , null)
    }
    console.log('Data is valid')
    return utils.template_response(res, 200, "Data valid", null)
  })
})

router.get('/verify-email/', (req, res) =>{
  let { id } =  req.query
  let data_temp=[]
  let now = moment().format()
  //cek token
  let findToken = `SELECT * FROM temp_users where token='${id}' && token_expired>'${now}' `
  db.query(findToken,(err, data)=>{
    if (err) console.log(err.response)
    console.log(data)
    if(data.length===0){
      console.log('kosong')
      return utils.template_response(res, 422, "Token tidak valid" , null)
    }
    data_temp = data[0]
    console.log('Token is valid')
    //cek user
    let findUser = `SELECT * FROM users where npm='${data_temp.npm}' or email='${data_temp.email}'`
    db.query(findUser,(err, user)=>{
      if (err) console.log(err.response)
      if(user.length>0){
        return utils.template_response(res, 200, "Akun sudah pernah didaftarkan" , null)
      }
      let insertSql = `INSERT INTO users (name, npm, ktm_url, password, email, created_at)
      SELECT name, npm, ktm_url, password, email, created_at
      FROM temp_users
      WHERE npm='${data_temp.npm}'`
      db.query(insertSql,(err, result)=>{
        if (err) console.log(err.response)
        console.log(result)
        let delSql = `delete from temp_users where token=${data_temp.token}`
        db.query(delSql,(err, del)=>{
          if (err) console.log(err.response)
          return utils.template_response(res, 200, "Register Berhasil" , null)
        })
      })
    })
  })
})
module.exports = router