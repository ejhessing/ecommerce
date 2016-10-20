"use strict"
require('dotenv').config();
var config = require('../knexfile.js')[ process.env.NODE_ENV || 'development' ]
var knex = require('knex')(config)



module.exports = {
  addToCart: addToCart,
  checkIfInCart: checkIfInCart,
  createUser: createUser,
  getCart: getCart,
  findByLogin: findByLogin,
  getHistory: getHistory,
  getProduct: getProduct,
  getProducts: getProducts,
  removeAllFromCart: removeAllFromCart,
  removeFromCart: removeFromCart,
  getUserById: getUserById,
  updateCart: updateCart,
  getUsers: getUsers,
  moveCartToHistory, moveCartToHistory
}

function createUser (email, password, name, address, city, country, postcode) {
  return knex('users')
    .insert ({email: email, password: password, name: name, address: address, city: city, country: country, postcode: postcode})
    .returning('id')
    .then(function(id){
      return knex('cart')
        .update({user_id: parseInt(id,10)})
        .returning('id')
    })
    .catch(function (err) {
      console.log(err)
    })
}



function getProducts () {
  return knex('products')
    .catch(function (err) {
      console.log(err)
    })
}

function getProduct (id) {
  return knex('products')
    .where('id', id)
    .catch(function (err) {
      console.log(err)
    })
}


// Cart Logic
function getCart () {
  return knex('cart')
    .join('products', 'product_id', '=', 'products.id')
    .select()
    .then(function (data) {
      let data2 = (data).map(getTotal)
      data2.total = getCartTotal(data)
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

function getHistory () {
  return knex('history')
    .join('products', 'product_id', '=', 'products.id')
    .select()
    .then(function (data) {
      let data2 = (data).map(getTotal)
      data2.total = getCartTotal(data)
      return data2
    })
    .catch(function (err) {
      console.log(err)
    })
}



function addToHistory (data) {
  return knex('history')
    .insert({user_id: data.user_id, product_id: data.product_id, quantity: data.quantity })
    .returning('id')
    .then(function(data){
      return data
    })
    .catch(function (err) {
      console.log(err)
    })
}

function removeAllFromCart () {
  return knex('cart')
    .select()
    .del()
    .catch(function (err) {
      console.log(err)
    })
}

function findByLogin (email) {
  return knex('users')
    .select()
    .where('email', email)
    .catch(function (err) {
      console.log(err)
    })
}

function getUserById (id) {
  return knex('users')
    .join('history', 'users.id', "=", "user_id")
    .where('users.id', id)
    .select()
    .then(function(data){
      return knex('history')
        .join('products', 'product_id', '=', 'products.id')
        .where('products.id', data[0].product_id)
        .where('user_id', data[0].user_id)
        .then(function (data) {
            let data2 = (data).map(getTotal)
            data2.total = getCartTotal(data)
            return data2
        })
    })
    .catch(function (err) {
      console.log(err)
    })

}

function findByLogin (email) {
  return knex('users')
    .where('users.email', email)
    .select()
    .catch(function (err) {
      console.log(err)
    })
}

function moveCartToHistory () {
  getCart() //a promise was not returned
    .then(function(data){
      console.log(data)
      for(var i = 0; i< data.length; i++){
        addToHistory(data[i])
      }
      return
    })
}

function getUsers () {
   return knex('users')
}

