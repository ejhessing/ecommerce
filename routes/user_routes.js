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
         res.redirect("/profile")
      })
})

router.post("/changePassword", (req, res) => {
   
})