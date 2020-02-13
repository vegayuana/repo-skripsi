const express = require('express')
const router = express.Router()
const utils = require('../utils/templates')
const fs = require('fs')
//connect DB
const db = require('../db/db')
require('../db/connection')

//Show User Acc
router.get('/show-acc', (req, res) =>{  
  let sql = 'SELECT * FROM USERS WHERE role = "user"'
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
    if (err) console.log(err)
  })
})

//Unverified
router.delete('/unverified/:id', (req, res) =>{  
  const id = req.params.id
  let find = `SELECT ktm_url from users WHERE id='${id}' LIMIT 1`
  db.query(find, (err, result)=>{
    if (err) {
      console.log(err)
      return utils.template_response(res, 500, 'Failed to delete the photo' , null)
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
          return utils.template_response(res, 500, 'Failed to delete' , null)
        }
        console.log('Success')
        return utils.template_response(res, 200, 'Success' , null)
      })
    }
  })
})

//Show Skripsi
router.get('/show-skripsi', (req, res) =>{  
  let sql = `SELECT skripsi.id, skripsi.user_id, skripsi.title, skripsi.published_year, skripsi.abstract, skripsi.file_url, skripsi.uploaded_at, skripsi.processed_at, skripsi.is_approved, users.name 
            FROM skripsi join users where skripsi.user_id = users.id`
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
    if (err) console.log(err)
  })
})

//Unpproved Skripsi
router.put('/unapproved/:id', (req, res) =>{  
  const id = req.params.id
  console.log('this is id', id)
  let sql = `UPDATE skripsi SET is_approved=${false}, processed_at=NOW() where id='${id}'`
  db.query(sql, (err, result)=>{
    if (err) {
      console.log(err)
      return utils.template_response(res, 500, 'Failed to delete' , null)
    }
    console.log('Success')
    return utils.template_response(res, 200, 'Success' , null)
  })
})
module.exports = router