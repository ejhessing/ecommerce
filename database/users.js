"use strict"
require('dotenv').config();
const config = require('../knexfile.js')[ process.env.NODE_ENV || 'development' ]
const knex = require('knex')(config)
const bcrypt   = require('bcrypt-nodejs')

module.exports = {
  updateUser
}

function updateUser (address, city, country, postcode) {
return knex ('users')
  .update({
     address: address,
     city: city,
     country: country,
     postcode: postcode
  })
}

