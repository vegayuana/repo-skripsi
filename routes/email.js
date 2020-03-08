const express = require('express')
const router = express.Router()

//connect DB
const db = require('../db/db')
require('../db/connection')

//show all skripsi
router.get('/user', (req, res) =>{  
  var helper = require('sendgrid').mail;
  var from_email = new helper.Email('no-reply@repositori.com');
  var to_email = new helper.Email('vegayuana@gmail.com');
  var subject = 'Hello World from the SendGrid Node.js Library!';
  var vvega='vega'
  var emailText=`<html>
  <body>
  <p>heloo hahaha</p>
  <a href=${'http://localhost:3000/'+1}>helo${vvega}<a>
  </body>
  </html>
  `
  var content = new helper.Content('text/html', emailText);
 
  var mail = new helper.Mail(from_email, subject, to_email, content);

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON(),
});

sg.API(request, function(error, response) {
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
});
})
module.exports = router