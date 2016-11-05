const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')
require('dotenv').config()


module.exports = {
   resetLink,
   passwordChanged, 
   purchase,
   updateDetails
}

function key () { 
   return {
      auth: {
        api_key: process.env.SGApi
      }
   }
}

function sendMail (email) {
  const mailer = nodemailer.createTransport(sgTransport(key()))

  mailer.sendMail(email, (err, res) => {
    if (err) { 
      console.log(err)
    }
    console.log(res)
  })
}


function resetLink (host, emailAddress, token) {

   const email = {
     to: emailAddress,
     from: process.env.HOST_EMAIL,
     subject: 'Password Reset',
     text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://' + host + '/resetPassword/' + token + '\n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
   }
     
  sendMail(email)
}

function passwordChanged (emailAddress) {

   const email = {
     to: emailAddress,
     from: process.env.HOST_EMAIL,
     subject: 'Password Changed',
     text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + emailAddress + ' has just been changed.\n'
   }
   
  sendMail(email)

}

function purchase (host, emailAddress) {

       
   const email = {
     to: emailAddress,
     from: process.env.HOST_EMAIL,
     subject: 'Purchase from ' + process.env.NAME,
     text: 'Hello from ' + process.env.NAME + '\n\n' +
          'Thank you for your order, your goods will be shipped shortly! \n' +
          '\n\n' +
          'To see what you have ordered or change shipping details log into ' +
          'http://' + host + '/login' + '\n\n' 
   }
   
  sendMail(email)

}

function updateDetails (emailAddress) {
   const email = {
     to: emailAddress,
     from: process.env.HOST_EMAIL,
     subject: 'Details updated',
     text: 'Hello from ' + process.env.NAME + '\n\n' +
           'This is a confirmation that the details for your account ' + emailAddress + ' has just been changed.\n'
   }
   
  sendMail(email)

}