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
  afterPurchase: afterPurchase,
  getProducts: getProducts
}

function createUser (email, password, name, address, city, country, postcode) {
  return knex('users')
    .insert ({email: email, password: password, name: name, address: address, city: city, country: country, postcode: postcode})
    .returning('id')
    .then(function(id){
        getCart().then(function(data){
          for(var i =0; i< data.length; i++){
            knex('history')
              .insert({user_id: parseInt(id,10), product_id: data[i].product_id, quantity: data[i].quantity })
              .returning('id')
              .then(function(data){
                return data
              })
          }
          return id
        })


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

function afterPurchase () {

}
