const express = require('express');
const mongoose =  require('mongoose');
const path = require('path');
const app = express();

//Bodyparser Middleware
app.use(express.json());

//Koneksi ke MongoDB
const db = require('./config/keys').mongoURI;
mongoose.connect(db, {
  userNewUrlParser: true, 
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('MongoDB Connected!'))
  .catch(error => console.log(error));

//Routes 
app.use('/skripsi', require('./routes/api/skripsi'));

// serve static asset
if (process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
//Start Express
app.listen(port, () => console.log(`Server running on port ${port}`))
