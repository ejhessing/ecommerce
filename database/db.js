require('dotenv').config();
var config = require('../knexfile.js')[ process.env.NODE_ENV || 'development' ]
var knex = require('knex')(config)

module.exports = {
  createUser: createUser
}

function createUser (email, password, name, address, city, country, postcode) {
  return knex('users')
    .insert ({email: email, password: password})
    .returning('id')
    .then(function (id) {
      return knex('profiles')
        .insert({name: name, address: address, city: city, country: country, postcode: postcode, user_id: id[0]})
        .returning('user_id')
    })
    .catch(function (err) {
      console.log(err)
    })


}
