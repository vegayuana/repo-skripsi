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
const proxy = require("http-proxy-middleware");
//Middleware Auth
const auth = require('./middleware/auth')
const cors = require('cors')
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
//Bodyparser Middleware
app.use(express.json())
app.use(cors(corsOptions))

app.use((req, res, next) =>{
  console.log("go to middleware")
  next()
})

app.use(proxy(["/"], { target: "http://localhost:5000" }));
app.use('/test', routes)
app.use('/', registerRoutes)
app.use('/', authRoutes)
app.use('/skripsi', skripsiRoutes)
app.use('/skripsi', skripsiDetailRoutes)
app.use('/user', auth.users, userRoutes)
app.use('/admin', auth.admin, adminRoutes)

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//static
app.use('/files/ktm', express.static(path.join(__dirname, 'files', 'ktm')))
app.use('/files/skripsi', express.static(path.join(__dirname, 'files', 'skripsi')))

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