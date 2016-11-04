const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')
require('dotenv').config()


module.exports = {
   resetLink
}

function resetLink (host, emailAddress, token) {
   const options = {
      auth: {
        api_key: process.env.SGApi
      }
   }
          
   const mailer = nodemailer.createTransport(sgTransport(options))
       
   const email = {
     to: emailAddress,
     from: process.env.host_email,
     subject: 'Node.js Password Reset',
     text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://' + host + '/resetPassword/' + token + '\n\n' +
      'You have an hour to use this link or it becomes invalid \n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
   }
     
   mailer.sendMail(email, (err, res) => {
      if (err) { 
        console.log(err)
      }
      console.log(res)
   })
}

