const express = require('express')
const router = express.Router()
const db = require("../database/db")
const paypal = require("./paypal")


module.exports = router

router.get('/', function (req,res) {
  db.getProducts()
    .then(function(data) {
      res.render(__dirname + '/../views/index.hbs', {data: data})
    })
})

router.post("/register", function (req, res) {
  const name = req.body.name
  const address = req.body.address
  const city = req.body.city
  const country = req.body.country
  const postcode = req.body.postcode
  const email = req.body.email
  const password = req.body.password
  db.createUser(email, password, name, address, city, country, postcode)
    .then(function (){
      res.redirect("/create")
    })
})

router.get("/cart", function(req, res) {
  db.getCart()
  .then(function (data){
    res.render(__dirname + '/../views/cart.hbs', {data: data})
  })
})

router.get("/register", function(req, res) {
  db.getCart()
  .then(function (data){
    res.render(__dirname + '/../views/register.hbs', {data: data})
  })
})




// Paypal
function init(data) {
  let config = data
  paypal.configure(data.api)
}

router.get("/create",function(req, res) {
  db.getCart()
    .then(function(data){
        paypal.create(req, res, data.total)
    })
})

router.get("/execute",function(req, res) {
  paypal.execute(req, res)
})

router.get("/cancel", function(req, res){
  res.send("The payment got canceled")
})

router.get("/thanks", function(req, res) {
  res.send("Thank you for signing up!")
})
