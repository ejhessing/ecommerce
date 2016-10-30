const db = require("../database/db")
const users = require("../database/users")
const express = require('express')
const router = express.Router()

module.exports = router

router.post("/updateProfile", (req, res) => {
   const id = req.body.id   
   const address = req.body.address
   const city = req.body.city
   const country = req.body.country
   const postcode = req.body.postcode
   
   users.updateUser(id, address, city, country, postcode)
      .then(() => {
         const session = req.session.passport.user | 0
         if(session === 0) { 
            res.redirect("/login")         
         } else {
            res.redirect('/profile')
         }

      })
})

router.post("/changePassword", (req, res) => {
   const id = req.body.id   
   const password = req.body.password   
   const passwordNew1 = req.body.passwordNew1   
   const passwordNew2 = req.body.passwordNew2

   if(passwordNew1 != passwordNew2) {
      console.log("Your confirm password does not match")
   } else {
      users.changePassword(id, password, passwordNew1)
         .then(() => {
            res.redirect('/login')
         })
   }
})

router.get("/forgot", (req, res) => {
  res.render('forgot_password')
})

router.post("/forgot", (req, res) => {
  const email = req.body.email
  users.createToken(email)
  //Send email
  console.log("We got your email address " + email)
  res.redirect('/')
})

router.get("/resetPassword/:token", (req, res) => {
  const token = req.params.token
  res.render('reset_password', { token: token } )
})


router.post("/resetPassword", (req, res) => {
  const token = req.body.token;
  const password = req.body.password;
  const email = req.body.email;
  users.resetPassword(email, password, token)
    .then((id) => {
      //sendEmail.passwordChanged(email);
      res.redirect('/')
 });
});

router.get('/reset', (req, res) => {
  users.getResetDB()
    .then((data) => {
      res.json({data: data})
    })
})