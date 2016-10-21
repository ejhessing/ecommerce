"use strict"
const db = require("../database/db")
const cart = require("../database/cart")

const express = require('express')
const paypal = require("./paypal")
const router = express.Router()

module.exports = router

router.get('/', (req,res) => {
  db.getProducts()
    .then((data) => {
      res.render(__dirname + '/../views/index.hbs', { data: data })
    })
})

//Product Page
router.get("/products/:id", (req, res) => {
  let id = req.params.id
  db.getProduct(id)
    .then((data) => {
      res.render(__dirname + '/../views/products.hbs', { data: data[0] })
    })
})

router.get("/checkout", (req, res) => {

  cart.getCart(req.session.coupon)
    .then((data) => {
      res.render(__dirname + '/../views/checkout.hbs', { data: data })
    })
})

router.get("/thanks", function(req, res) {
  db.afterPurchase()
  .then(function (data){
    res.render(__dirname + '/../views/thanks.hbs', { data: data })
  })
})


router.get("/create", (req, res) => {
  let total = req.session.total
  if(total) { 
    paypal.create(req, res, req.session.total)
  } else {
    cart.getCart()
      .then((data) => {
        paypal.create(req, res, data.total)
      })
  }
    
})

router.get("/execute", (req, res) => {
  paypal.execute(req, res)
})

router.get("/cancel", (req, res) => {
  res.send("The payment got canceled")
})

router.get("/sorry", (req, res) => {
  res.send("Sorry something went wrong with creating an account")
})


router.get("/login", (req, res) => {
  res.render(__dirname + '/../views/login.hbs')
})



router.get ("/profile", (req, res) => {
  let id = req.session.passport.user
  db.getUserById(id)
    .then((user) => {
      res.render(__dirname + '/../views/profile.hbs', { data: user })
    })
    .catch((err) => {
      console.log(err)
    })

})

router.get("/about", (req, res) => {
    res.render(__dirname + '/../views/about.hbs')
})

router.get('/users', (req, res) => {
  db.getUsers()
    .then((data) => {
        res.json({ data: data })
    })
})

