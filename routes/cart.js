"use strict"
const db = require("../database/db")
const express = require('express')
const router = express.Router()

module.exports = router

router.get("/cart", (req, res) => {
  db.getCart()
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
  db.checkIfInCart(data)
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
  db.removeFromCart(id)
    .then((data) => {
       res.redirect("/cart")
    })
    .catch((err) => {
      console.log(err)
    })
})