const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')
require('dotenv').config()


module.exports = {
   resetLink,
   passwordChanged, 
   purchase
}

function key () { 
   return {
      auth: {
        api_key: process.env.SGApi
      }
   }
}

function sendMail (mailer, email) {
  mailer.sendMail(email, (err, res) => {
    if (err) { 
      console.log(err)
    }
    console.log(res)
  })
}


function resetLink (host, emailAddress, token) {

   const mailer = nodemailer.createTransport(sgTransport(key()))
       
   const email = {
     to: emailAddress,
     from: process.env.HOST_EMAIL,
     subject: 'Node.js Password Reset',
     text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://' + host + '/resetPassword/' + token + '\n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
   }
     
  sendMail(mailer, email)
}

function passwordChanged (emailAddress) {

   const mailer = nodemailer.createTransport(sgTransport(key()))
       
   const email = {
     to: emailAddress,
     from: process.env.HOST_EMAIL,
     subject: 'Node.js Password Reset',
     text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + emailAddress + ' has just been changed.\n'
   }
   
  sendMail(mailer, email)

}

function purchase (host, emailAddress) {

   const mailer = nodemailer.createTransport(sgTransport(key()))
       
   const email = {
     to: emailAddress,
     from: process.env.HOST_EMAIL,
     subject: 'Node.js Password Reset',
     text: 'Hello from ' + process.env.NAME + '\n\n' +
          'Thank you for your order, your goods will be shipped shortly! \n' +
          '\n\n' +
          'To see what you have ordered or change shipping details log into ' +
          'http://' + host + '/login' + '\n\n' 
   }
   
  sendMail(mailer, email)

}

