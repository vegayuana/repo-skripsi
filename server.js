require("dotenv").config();
const express = require('express');
const routes = require('./routes')
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
const auth = require('./middleware/auth')
const app = express();

//Bodyparser Middleware
app.use(express.json());

app.use((req, res, next) =>{
  console.log("go to middleware")
  next()
})
app.use('/test', routes)
app.use('/user', userRoutes)
app.use('/admin', adminRoutes)

//Start Express
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`))