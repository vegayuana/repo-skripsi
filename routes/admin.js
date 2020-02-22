const express = require('express')
const router = express.Router()
const utils = require('../utils/templates')
const fs = require('fs')
//connect DB
const db = require('../db/db')
require('../db/connection')

//Show User Acc
router.get('/show-acc', (req, res) =>{  
  let sql = `SELECT * FROM USERS WHERE role = "user" 
            ORDER BY created_at desc`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result)
  })
})

//Verification
router.put('/verified/:id', (req, res) =>{  
  const id = req.params.id
  let sql = `UPDATE users SET is_active=${true}, processed_at=NOW() where id='${id}'`
  db.query(sql, (err, result)=>{
    if (err) {
      console.log(err)
      return utils.template_response(res, 500, 'Gagal' , null)
    }
    return utils.template_response(res, 200, 'Berhasil' , null)
  })
})

//Unverified
router.delete('/unverified/:id', (req, res) =>{  
  const id = req.params.id
  let find = `SELECT ktm_url from users WHERE id='${id}' LIMIT 1`
  db.query(find, (err, result)=>{
    if (err) {
      console.log(err)
      return utils.template_response(res, 500, 'Gagal menghapus foto KTM' , null)
    }
    else{
      let file_url=result[0].ktm_url
      fs.unlink(file_url, (err) => {
        if (err) console.log(err)
        console.log(file_url, 'was deleted')
      })
      let sql = `delete from users where id='${id}'`
      db.query(sql, (err, result)=>{
        if (err) {
          console.log(err)
          return utils.template_response(res, 500, 'Akun gagal Dihapus' , null)
        }
        console.log('Success')
        return utils.template_response(res, 200, 'Berhasil' , null)
      })
    }
  })
})

//Show Skripsi
router.get('/show-skripsi', (req, res) =>{  
  let sql = `SELECT skripsi.id, skripsi.user_id, skripsi.title, skripsi.published_year, skripsi.abstract, skripsi.file_url, skripsi.uploaded_at, skripsi.processed_at, skripsi.is_approved, users.name 
            FROM skripsi join users where skripsi.user_id = users.id 
            ORDER BY uploaded_at desc`
  db.query(sql, (err, result)=>{
    if (err) console.log(err)
    res.send(result)
  })
})

//Approve Skripsi
router.put('/approved/:id', (req, res) =>{  
  const id = req.params.id
  let sql = `UPDATE skripsi SET is_approved=${true}, processed_at=NOW() where id='${id}'`
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
  let sql = `UPDATE skripsi SET is_approved=${false}, processed_at=NOW() where id='${id}'`
  db.query(sql, (err, result)=>{
    if (err) {
      console.log(err)
      return utils.template_response(res, 500, 'Gagal' , null)
    }
    console.log('unapproved')
    return utils.template_response(res, 200, 'Berhasil' , null)
  })
})
module.exports = router