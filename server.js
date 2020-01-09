const express = require('express');
// const path = require('path');
const apiRoutes = require('./routes')
const userRoutes = require('./routes/users')
const app = express();

//Bodyparser Middleware
app.use(express.json());

app.use('/', userRoutes)

//Start Express
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`))


//Routes 
// app.use('/skripsi', require('./routes/api/skripsi'));

// // serve static asset
// if (process.env.NODE_ENV === 'production'){
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//   });
// }

