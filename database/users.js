"use strict"
require('dotenv').config();
const config = require('../knexfile.js')[ process.env.NODE_ENV || 'development' ]
const knex = require('knex')(config)
const bcrypt   = require('bcrypt-nodejs')
const crypto = require('crypto')

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

function createToken (email) {
  const token = generateHash(email)
  const oneHour = 3600000;
  const expiredAt = Date.now() + oneHour;
  findByLogin(email)
    .then((user) => {
      if(!user) {
          console.log('error', "No user with that email address exists")
          return ('error')
      } 
      console.log(user)
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
  
}

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

function validPassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}

