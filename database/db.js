"use strict"
require('dotenv').config();
const config = require('../knexfile.js')[ process.env.NODE_ENV || 'development' ]
const knex = require('knex')(config)
const cart = require("./cart")



module.exports = {
  createUser,
  findByLogin,
  getHistory,
  getProduct,
  getProducts,
  findUserById,
  getUserById,
  getUsers,
  moveCartToHistory
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




function getHistory () {
  return knex('history')
    .join('products', 'product_id', '=', 'products.id')
    .select()
    .then(function (data) {
      let data2 = (data).map(cart.getTotal)
      data2.total = cart.getCartTotal(data)
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



function findByLogin (email) {
  return knex('users')
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
            let data2 = (data).map(cart.getTotal)
            data2.total = cart.getCartTotal(data)
            return data2
        })
    })
    .catch(function (err) {
      console.log(err)
    })

}



function moveCartToHistory () {
  cart.getCart() //a promise was not returned
    .then(function(data) {
      for(var i = 0; i< data.length; i++){
        addToHistory(data[i])
      }
      return
    })
}

function getUsers () {
   return knex('users')
}

function findUserById (id) {
   return knex('users')
    .where({ id: id });
}