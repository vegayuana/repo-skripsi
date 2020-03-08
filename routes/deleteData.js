const express = require('express')
const router = express.Router()
const utils = require('../utils/templates')
const fs = require('fs')
const moment = require('moment')

//connect DB
const db = require('../db/db')
require('../db/connection')

router.delete('/data', (req, res) =>{  
  console.log(moment().format())
  let find= `select ktm_url from users where email_verified=${0} and email_expired<'${moment().format()}'`
  db.query(find,(err, result)=>{ 
    if (err) {
      console.log(err)
    }
    else{
      console.log(result)
      let ktm_url=result
      ktm_url.map(ktm=>{
        console.log(ktm)
        fs.unlink(ktm, (err) => {
          if (err) console.log(err, 'failed to delete ktm')
          console.log(ktm, 'was deleted')
        })
      })
      let sql = `delete from users where email_verified=${0} and email_expired<${moment().format()}`
      db.query(sql, (err, result)=>{
        if (err) {
          console.log(err)
          return utils.template_response(res, 500, 'Akun gagal dihapus' , null)
        }
        return utils.template_response(res, 200, 'Akun Berhasil dihapus' , null)
      })
      res.send(result)
    }
  })
})
module.exports = router