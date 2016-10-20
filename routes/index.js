"use strict"
const db = require("../database/db")
const express = require('express')
const paypal = require("./paypal")
const router = express.Router()

module.exports = router

router.get('/', function (req,res) {
  db.getProducts()
    .then(function(data) {
      res.render(__dirname + '/../views/index.hbs', {data: data})
    })
})

//Product Page
router.get("/products/:id", function(req, res){
  let id = req.params.id
  db.getProduct(id)
    .then(function(data) {
      res.render(__dirname + '/../views/products.hbs', {data: data[0]})
    })
})

router.post("/checkout", function (req, res) {
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


router.get("/checkout", function(req, res) {
  db.getCart()
  .then(function (data){
    res.render(__dirname + '/../views/checkout.hbs', {data: data})
  })
})

router.get("/thanks", function(req, res) {
  db.afterPurchase()
  .then(function (data){
    res.render(__dirname + '/../views/thanks.hbs', {data: data})
  })
})


router.get("/create", function(req, res) {
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


router.get("/cart", function(req, res) {
  db.getCart()
  .then(function (data){
    res.render(__dirname + '/../views/cart.hbs', {data: data})
  })
})


// Add to cart
router.post("/add", function(req, res) {
  let data = {
    id: req.body.id,
    quantity: req.body.quantity
  }
  db.checkIfInCart(data)
    .then(function(data){
       res.redirect("/cart")
    })
    .catch(function (err) {
      console.log(err)
    })
})

  //Remove from cart
router.post("/remove", function(req, res) {
  let id = req.body.id
  db.removeFromCart(id)
    .then(function(data){
       res.redirect("/cart")
    })
    .catch(function (err) {
      console.log(err)
    })
})


router.get("/checkout", function(req, res) {
  db.getCart()
  .then(function (data){
    res.render(__dirname + '/../views/checkout.hbs', {data: data})
  })
})

router.get("/thanks", function(req, res) {
  db.afterPurchase()
  .then(function (data){
    res.render(__dirname + '/../views/thanks.hbs', {data: data})
  })
})


router.get("/create",function(req, res) {
  db.getCart()
    .then(function(data){
        paypal.create(req, res, data.total)
    })
})

router.get("/execute",function(req, res) {
  paypal.execute()
    .then(results => {
      res.render(__dirname + '/../views/thanks.hbs', results)
    })
})

router.get("/cancel", function(req, res){
  res.send("The payment got canceled")
})


router.get("/login", function(req, res) {
  res.render(__dirname + '/../views/login.hbs')
})



router.get ("/profile", function(req, res) {
  let id = req.session.passport.user
  db.getUserById(id)
    .then(function(user) {
      res.render(__dirname + '/../views/profile.hbs', {data: user})
    })
    .catch(function (err) {
      console.log(err)
    })

})

router.get("/about", function(req, res) {
    res.render(__dirname + '/../views/about.hbs')
})

router.get('/users', (req, res) => {
        db.getUsers()
            .then((data) => {
                res.json({data: data})
            })
})

