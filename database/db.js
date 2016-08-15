require('dotenv').config();
var config = require('../knexfile.js')[ process.env.NODE_ENV || 'development' ]
var knex = require('knex')(config)

module.exports = {
  createUser: createUser,
  getCart: getCart,
  getProduct: getProduct,
  addToCart: addToCart,
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
  return knex('cart')
    .join('products', 'product_id', '=', 'products.id')
    .where('products.id', input.id)
    .then(function (data) {
      let userId = data[0].user_id || null
      let quantity = input.quantity || 1
      return knex('cart')
        .insert({product_id: data[0].product_id, user_id: userId, quantity: quantity})
        .catch(function (err) {
          console.log(err)
        })
    })
    .catch(function (err) {
      console.log(err)
    })
}
