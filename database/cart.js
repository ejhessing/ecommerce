"use strict"
const config = require('../knexfile.js')[ process.env.NODE_ENV || 'development' ]
const knex = require('knex')(config)

module.exports = {
   getCart,
   getTotal,
   getCartTotal,
   checkIfInCart,
   addToCart,
   updateCart,
   removeFromCart,
   removeAllFromCart,
   discountCart
}

// Cart Logic
function getCart (discount) {
  return knex('cart')
    .join('products', 'product_id', '=', 'products.id')
    .select()
    .then(function (data) {
      let data2 = (data).map(getTotal)
      data2.total = getCartTotal(data)
      data2.discount = ((discount / 100) * data2.total).toFixed(0) | 0
      data2.total -= data2.discount
      return data2
    })
    .catch(function (err) {
      console.log(err)
    })
}

//Get product total
function getTotal (data) {
  data.total = data.quantity * data.price
  return data
}

//Gets the total of the cart
function getCartTotal (data) {
  let total = 0
  for(var i = 0; i < data.length; i++) {
    total += data[i].total
  }
  return total
}

function checkIfInCart (data) {
  return knex('cart')
    .where('product_id', data.id)
    .count('product_id')
    .then(function(count){
      if(count[0].count == 1){
        return updateCart(data)
      } else {
        return addToCart(data)
      }
    })
    .catch(function(err){
      console.log(err)
    })
}

function addToCart(input) {
  let userId = input.userId || null
  let quantity = input.quantity || 1
  return knex('cart')
  .insert({product_id: input.id, user_id: userId, quantity: quantity})
  .catch(function (err) {
    console.log(err)
  })
}

function updateCart (data) {
  return knex('cart')
    .where('product_id', data.id)
    .increment('quantity', data.quantity)
    .catch(function(err){
      console.log(err)
    })
}

function removeFromCart (id) {
  return knex('cart')
    .where('product_id', id)
    .del()
    .catch(function (err) {
      console.log(err)
    })
}

function discountCart(coupon) {
   return knex('coupons')
      .where('code', coupon)
      .returning('discount')
}

function removeAllFromCart () {
  return knex('cart')
    .select()
    .del()
    .catch(function (err) {
      console.log(err)
    })
}