const db = require('./db')

const conn = db.connect((err)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log("Database Connected...")
  }
})
module.exports = conn