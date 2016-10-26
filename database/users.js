"use strict"
require('dotenv').config();
const config = require('../knexfile.js')[ process.env.NODE_ENV || 'development' ]
const knex = require('knex')(config)
const bcrypt   = require('bcrypt-nodejs')

module.exports = {
  updateUser,
  changePassword
}

function updateUser (id, address, city, country, postcode) {
return knex ('users')
  .where({ 'id' : id })
  .update({
     address: address,
     city: city,
     country: country,
     postcode: postcode
  })
}

function changePassword (id, password, newPassword) {
  const newHash = generateHash(newPassword)
  console.log(id)
  return knex ('users')
    .where({ 'id' : id })
    .then((user) => {
      console.log(user)
      if(!validPassword(password, user[0].password)) {
        console.log("Sorry incorrect password")
        return
      } else {
        return knex('users')
          .where({ 'id' : id })
          .update({
            password: newHash
          })
      }
    })
}


function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

function validPassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}