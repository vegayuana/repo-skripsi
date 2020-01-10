require("dotenv").config();
const express = require('express');
const routes = require('./routes')
const userRoutes = require('./routes/user')
const app = express();

//Bodyparser Middleware
app.use(express.json());
app.use('/test', routes)
app.use('/user', userRoutes)

//Start Express
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`))