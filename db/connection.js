const db = require('./db')

const conn = db.connect((err)=>{
  if(err){
    console.log(err)
  }
  console.log("Mysql Connected...")
})
module.exports = conn