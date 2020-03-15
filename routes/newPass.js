const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const uuid = require('uuid/v4')
const utils = require('../utils/templates')

//connect DB
const db = require('../db/db')
require('../db/connection')

//request new pass
router.put('/forgot-pass', (req, res) =>{  
  let {npm, email} = req.body
  console.log(req.body)
  let findUser = `SELECT npm FROM users where role='user' AND npm='${npm}' and email='${email}'`
  db.query(findUser, async(err, data)=>{
    try{
      console.log(data)
      if(data.length===0){
        return utils.template_response(res, 422, "Akun belum terdaftar" , null)
      }
      let newPass = uuid().substring(0, 8)
      let enPass = await bcrypt.hash(newPass, 10)
      console.log(enPass)
      let sql =`update users set password='${enPass}' where npm='${npm}' and email='${email}'`
      console.log(sql)
      db.query(sql, (err, result)=>{
        if (err) {
          console.log(err)
          return utils.template_response(res, 500, "Password baru gagal dibuat", null)
        }
        console.log('Success')
        var helper = require('sendgrid').mail
        var from_email = new helper.Email('no-reply@repositori-skripsi.com')
        var to_email = new helper.Email(email)
        var subject = 'Lupa Password'
        var emailText=`<html>
        <body>
          <p>Anda melakukan permintaan untuk mengubah password. Berikut adalah password baru anda</p>
          <b style='text-align:center, color:#379683'>${newPass}</b>
          <p>Login menggunakan password diatas dan ganti password anda</p>
          </body>
        </html>
        `
        var content = new helper.Content('text/html', emailText)
        var mail = new helper.Mail(from_email, subject, to_email, content)
        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)
        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON(),
        })
        sg.API(request, function(error, response) {
          console.log(response.statusCode)
          console.log(response.body)
          console.log(response.headers)
        })
        return utils.template_response(res, 200, 'Password berhasil diganti' , null)
      })
    }
    catch{
      if (err) console.log(err.response)
      return utils.template_response(res, 500, "Password baru gagal dibuat", null)
    }
  })
})

module.exports = router