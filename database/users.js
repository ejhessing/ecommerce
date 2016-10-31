"use strict"
require('dotenv').config();
const config = require('../knexfile.js')[ process.env.NODE_ENV || 'development' ]
const knex = require('knex')(config)
const bcrypt   = require('bcrypt-nodejs')

module.exports = {
  updateUser,
  changePassword,
  findByLogin,
  resetPassword,
  createToken,
  getResetDB
}

function findByLogin (email) {
  return knex('users')
    .where('email', email)
    .catch(function (err) {
      console.log(err)
    })
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
  return knex ('users')
    .where({ 'id' : id })
    .then((user) => {
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

function createToken (email, token) {
  const oneHour = 3600000;
  const expiredAt = Date.now() + oneHour;
  findByLogin(email)
    .then((user) => {
      if(!user) {
          console.log('error', "No user with that email address exists")
          return ('error')
      } 
      return knex('reset')
          .insert({
            user_id: user[0].id,
            token: token,
            expiredAt: expiredAt
          })
    })
}

function getResetDB () {
  return knex('reset')
}

function resetPassword (email, password, token) {
  const currentTime = Date.now()
  const hash = generateHash(password)
  return knex('reset')
    .where({ token: token })
    .then(data => {
      if(data.expiredAt > currentTime){
        console.log("Sorry this link has expired, please create a new one")
      } else {
        return knex('users')
          .where({email: email})
          .update({password: hash})

      }

    })
}

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

function validPassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}

