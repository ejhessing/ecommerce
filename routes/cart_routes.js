"use strict"
const db = require("../database/db")
const cart = require("../database/cart")
const express = require('express')
const router = express.Router()

module.exports = router

router.get("/cart", (req, res) => {
  cart.getCart()
    .then((data) => {
      res.render(__dirname + '/../views/cart.hbs', {data: data})
    })
})


// Add to cart
router.post("/add", (req, res) => {
  let data = {
    id: req.body.id,
    quantity: req.body.quantity
  }
  cart.checkIfInCart(data)
    .then((data) => {
       res.redirect("/cart")
    })
    .catch((err) => {
      console.log(err)
    })
})

//Remove from cart
router.post("/remove", (req, res) => {
  let id = req.body.id
  cart.removeFromCart(id)
    .then((data) => {
       res.redirect("/cart")
    })
    .catch((err) => {
      console.log(err)
    })
})

//add discount to cart

router.post("/coupon", (req, res) => {
  let coupon = req.body.coupon.toLowerCase()
  req.session.coupon = coupon
  cart.discountCart(coupon)
    .then((code) => {
      let discount = 0
      if(code[0]) {
        discount = code[0].discount
      }
      cart.getCart(discount)
        .then((data) => {
          req.session.coupon = coupon
          req.session.total = data.total
          res.render(__dirname + '/../views/checkout.hbs', {data: data})          
        })
    })
})