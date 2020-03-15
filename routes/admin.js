
const express = require('express')
const router = express.Router()
const utils = require('../utils/templates')
const fs = require('fs')
const moment = require('moment')
const uuid = require('uuid/v4')
const jwt = require('jsonwebtoken')
const secret = "repository.secret"

//connect DB
const db = require('../db/db')
require('../db/connection')

//Show User Acc
router.get('/show-acc', (req, res) =>{  
  let sql = `SELECT * FROM USERS WHERE role = "user" 
            ORDER BY is_active, created_at desc`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result)
  })
})

//Verification
router.put('/verified/:id', (req, res) =>{  
  const id = req.params.id
  let time=moment().format()
  let sql = `UPDATE users SET is_active=${true}, processed_at='${time}' where npm='${id}'`
  db.query(sql, (err, result)=>{
    if (err) {
      console.log(err)
      return utils.template_response(res, 500, 'Gagal' , null)
    }
    let findUser = `SELECT name, email FROM users where role='user' AND npm='${id}'`
    db.query(findUser,(err, data)=>{
      if (err) console.log(err.response)
      console.log(data[0].email)
      var helper = require('sendgrid').mail
      var from_email = new helper.Email('no-reply@repositori-skripsi.com')
      var to_email = new helper.Email(data[0].email)
      var subject = 'Akun Telah Diaktifkan'
      var emailText=`<html>
      <body>
      <p>Halo ${data[0].name},</p>
        <p>Anda telah melakukan register akun pada web aplikasi repositori-skripsi.
        Akun anda telah ditinjau oleh admin dan telah diaktifkan. Silahkan login menggunakan npm yang didaftarkan.
        </p>
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
      return utils.template_response(res, 200, 'Berhasil' , null)
    })
  })
})

//Unverified
router.delete('/unverified/:id', (req, res) =>{  
  const id = req.params.id
  let find = `SELECT ktm_url, name, email from users WHERE role='user' and npm='${id}' LIMIT 1`
  db.query(find, (err, result)=>{
    if (err) {
      console.log(err)
      return utils.template_response(res, 500, 'Gagal menghapus akun' , null)
    }
    else{
      let data=result[0]
      let file_url=data.ktm_url
      fs.unlink(file_url, (err) => {
        if (err) console.log(err, 'failed to delete ktm')
        else console.log(file_url, 'was deleted')
      })
      let sql = `delete from users where npm='${id}'`
      db.query(sql, (err, result)=>{
        if (err) {
          console.log(err)
          return utils.template_response(res, 500, 'Akun gagal dihapus' , null)
        }
        console.log('Success')
        var helper = require('sendgrid').mail
        var from_email = new helper.Email('no-reply@repositori-skripsi.com')
        var to_email = new helper.Email(data.email)
        var subject = 'Akun Gagal Diaktifkan'
        var emailText=`<html>
        <body>
        <p>Halo ${data.name},</p>
          <p>Anda telah melakukan registrasi akun pada web aplikasi repositori-skripsi.
          Akun anda telah ditinjau oleh admin namun data yang anda inputkan tidak benar sehingga akun tidak dapat diaktifkan.
          </p>
          <p>Silahkan melakukan registrasi ulang pada web, dan pastikan untuk menginputkan npm dan foto ktm yang valid</p>
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

        return utils.template_response(res, 200, 'Berhasil' , null)
      })
    }
  })
})

//Show Skripsi
router.get('/show-skripsi', (req, res) =>{  
  let sql = `SELECT skripsi.id, skripsi.title, skripsi.published_year, skripsi.abstract, skripsi.abstrak, skripsi.file_url, skripsi.uploaded_at, skripsi.processed_at, skripsi.is_approved, users.name 
            FROM skripsi join users where skripsi.npm = users.npm 
            ORDER BY is_approved desc, uploaded_at desc`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result)
  })
})

//Approve Skripsi
router.put('/approved/:id', (req, res) =>{  
  const id = req.params.id
  let time=moment().format()
  let sql = `UPDATE skripsi SET is_approved=${true}, processed_at='${time}' where id='${id}'`
  db.query(sql, (err, result)=>{
    if (err) {
      console.log(err)
      return utils.template_response(res, 500, 'Gagal' , null)
    }
    console.log('approved')
    return utils.template_response(res, 200, 'Berhasil' , null)
  })
})

//Unpproved Skripsi
router.put('/unapproved/:id', (req, res) =>{ 
  const id = req.params.id
  let time=moment().format()
  let sql = `UPDATE skripsi SET is_approved=${false}, processed_at='${time}' where id='${id}'`
  db.query(sql, (err, result)=>{
    if (err) {
      console.log(err)
      return utils.template_response(res, 500, 'Gagal' , null)
    }
    console.log('unapproved')
    return utils.template_response(res, 200, 'Berhasil' , null)
  })
})

//Show Forum
router.get('/forum-list', (req, res) =>{  
  let sql = `SELECT forums.id, forums.text, forums.status, forums.sent_at, users.name FROM forums join users on forums.id like concat(users.npm, '%')         
            ORDER BY forums.status asc, forums.sent_at desc`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result)
  })
})

//Get user 
router.get('/user-list', (req, res) =>{  
  let sql = `SELECT users.npm, users.name from users where role='user'     
            ORDER BY users.npm`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result)
  })
})

router.get('/forum/', (req, res) =>{  
  let { id } =  req.query
  let sql = `SELECT forums.user_id, forums.text, forums.status, forums.sent_at, users.name FROM forums join users on users.npm=forums.user_id
            where forums.id like '${id}%' order by sent_at asc`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result)
  })
})

//insert forum 
router.post('/insert-text', (req, res) =>{  
  let {text, id} = req.body
  let bearer = req.headers.authorization
  let token = bearer.split(' ')[1]
  let payload = jwt.decode(token, secret).request
  let randomId = uuid().substring(0, 5)
  let post = {
    id: id+randomId,
    user_id: payload.npm,
    text: text,
    status: 1, 
    sent_at: moment().format()
  }
  let update = `update forums set status=${1} where id like '${id}%'`
  db.query(update, (err, result)=>{
    if(err){
      console.log(err)
      return utils.template_response(res, 500, "Gagal mengubah status" , null)
    }
    let sql = 'INSERT INTO forums SET ?'
    db.query(sql, post, (err, result)=>{
      if(err){
        console.log(err)
        return utils.template_response(res, 500, "Gagal mengirim" , null)
      } 
      console.log('success!')  
      return utils.template_response(res, 200, "Berhasil mengirim", null)
    })
  })
})
module.exports = router