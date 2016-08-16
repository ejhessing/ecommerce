require('dotenv').config();
var config = require('../knexfile.js')[ process.env.NODE_ENV || 'development' ]
var knex = require('knex')(config)

module.exports = {
  createUser: createUser,
  getCart: getCart,
  getProduct: getProduct,
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  updateCart: updateCart,
  checkIfInCart: checkIfInCart,
  getProducts: getProducts
}

function createUser (email, password, name, address, city, country, postcode) {
  return knex('users')
    .insert ({email: email, password: password, name: name, address: address, city: city, country: country, postcode: postcode})
    .catch(function (err) {
      console.log(err)
    })
}


function getCart () {
  return knex('cart')
    .join('products', 'product_id', '=', 'products.id')
    .select()
    .then(function (data) {
      data.total = getTotal(data)
      return data
    })
    .catch(function (err) {
      console.log(err)
    })
}

function getTotal (data) {
  let total = 0
  for(var i = 0; i < data.length; i++) {
    total += data[i].price
  }
  return total
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

function addToCart(input) {
//if item added is the same as the item already in cart increase cart by one
  let userId = input.userId || null
  let quantity = input.quantity || 1
  return knex('cart')
  .insert({product_id: input.id, user_id: userId, quantity: quantity})
  .catch(function (err) {
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

function checkIfInCart (data) {
  return knex('cart')
    .where('product_id', data.id)
    .count('product_id')
    .then(function(count){
      if(count[0].count == 1){
        updateCart(data)
      } else {
        addToCart(data)
      }
    })
    .catch(function(err){
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
