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
const proxy = require("http-proxy-middleware")

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
  console.log("go to middleware")
  next()
})

app.get('/', (req, res, next) => {
  if (req.headers.host === 'repositori-skripsi.herokuapp.com') {
   return res.redirect('https://' + req.headers.host + req.url)
  } else {
   next()
  }
 })

 
  // if (req.protocol ==='http' && req.headers.host === 'localhost:5000') {
 
app => {
  app.use(proxy(["/"], { target: "http://localhost:5000" }))
}
app.use('/test', routes)
app.use('/', registerRoutes)
app.use('/', authRoutes)
app.use('/skripsi', skripsiRoutes)
app.use('/skripsi', auth.gen, skripsiDetailRoutes)
app.use('/user', auth.users, userRoutes)
app.use('/admin', auth.admin, adminRoutes)

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