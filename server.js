require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const routes = require('./routes')
const registerRoutes = require('./routes/register')
const authRoutes = require('./routes/auth')
const skripsiRoutes = require('./routes/skripsi')
const skripsiDetailRoutes = require('./routes/skripsiDetail')
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
const newpassRoutes = require('./routes/newPass')
const proxy = require('http-proxy-middleware')

//-------Configuration

//Bodyparser Middleware
app.use(express.json())

//Cross origin 
const cors = require('cors')
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

//Middleware Auth
const auth = require('./middleware/auth')

app.use((req, res, next) =>{
  console.log('go to middleware')
  next()
})

//Redirecting http to https
const redirect = (req, res, next) => {
  if (
   req.headers.host !== 'localhost:5000' &&
   req.get('x-forwarded-proto') !== 'https'
  ) {
   res.set('x-forwarded-proto', 'https')
   res.redirect('https://repositori-skripsi.herokuapp.com' + req.url)
  } else next()
 }
 app.all('*', redirect)

app => {
  app.use(proxy(['/'], { target: 'http://localhost:5000' }))
}
app.use('/test', routes)
app.use('/', registerRoutes)
app.use('/', authRoutes)
app.use('/', newpassRoutes)
app.use('/skripsi', skripsiRoutes)
app.use('/skripsi', auth.gen, skripsiDetailRoutes)
app.use('/user', auth.users, userRoutes)
app.use('/admin', auth.admin, adminRoutes)

//----------delete unverified data
// var CronJob = require('cron').CronJob
// var job = new CronJob('*/1 * * * *', function() {
//   console.log('delete data unverified every 30 mins')
  
//   const db = require('./db/db')
//   require('./db/connection')
//   const fs = require('fs')
//   const moment = require('moment')
  
//   let find= `select ktm_url from temp_users where token_expired<'${moment().format()}'`
//   db.query(find,(err, result)=>{ 
//     if (err) {
//       console.log(err)
//     }
//     else{
//       console.log('array of unverified accounts',result)
//       let ktm_url=result
//       ktm_url.map(ktm=>{
//         console.log('ktm', ktm.ktm_url)
//         fs.unlink(ktm.ktm_url, (err) => {
//           if (err) console.log(err, 'failed to delete ktm')
//           else console.log(ktm.ktm_url, 'was deleted')
//         })
//       })
//       let sql = `delete from temp_users where token_expired<'${moment().format()}'`
//       db.query(sql, (err, result)=>{
//         if (err) {
//           console.log(err)
//           console.log('Failed to delete')
//           return
//         }
//         console.log('Done!')
//       })
//     }
//   })
// }, null, true)
// job.start()
//------------------

//static
app.use('/files/ktm', express.static(path.join(__dirname, 'files', 'ktm')))
app.use('/files/skripsi', express.static(path.join(__dirname, 'files', 'skripsi')))

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  // res.render('error')
})

//Start Express
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))