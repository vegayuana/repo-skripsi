require('dotenv').config()
const express = require('express')
var path = require('path')
const app = express()
const routes = require('./routes')
const registerRoutes = require('./routes/register')
const authRoutes = require('./routes/auth')
const skripsiRoutes = require('./routes/skripsi')
const skripsiDetailRoutes = require('./routes/skripsiDetail')
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
//middleware
const auth = require('./middleware/auth')

//Bodyparser Middleware
app.use(express.json())

app.use((req, res, next) =>{
  console.log("go to middleware")
  next()
})
app.use('/test', routes)
app.use('/', registerRoutes)
app.use('/', authRoutes)
app.use('/skripsi', skripsiRoutes)
app.use('/skripsi', auth.gen, skripsiDetailRoutes)
app.use('/user', userRoutes)
app.use('/admin', auth.admin, adminRoutes)

//static
app.use(express.static('files'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  // res.render('error');
})

//Start Express
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`))