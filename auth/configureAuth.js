const db = require('../database/db')
const bcrypt   = require('bcrypt-nodejs')

module.exports = {
  loginStrategy: loginStrategy,
  registerStrategy: registerStrategy
}


function loginStrategy (req, username, password, done) {
  db.findByLogin(username)
    .then(function (users) {
      if (!users || !users[0]) {
        console.log('Incorrect username.')
        return done(null, false, { message: 'Incorrect username.' })
      } else if (!validPassword(password, users[0].password)) {
        return done(null, false, { message: 'Incorrect password.' })
      } else {
        return done(null, users[0])
      }
    })
    .catch(function (err) {
      return done(err)
    })
}

function registerStrategy (req, username, password, done) {
  process.nextTick(() => {
    db.findByLogin(username)
      .then(function (users) {
        if (users && users[0]) {
        done(null, false,
           console.log('User Already Exists'))
        } else {
          const name = req.body.name
          const address = req.body.address
          const city = req.body.city
          const country = req.body.country
          const postcode = req.body.postcode
          const hash = generateHash(password)
          req.session.email = username
          db.createUser(username, hash, name, address, city, country, postcode)
            .then(function (users) {
              done(null, {id : users})
            })
            .catch(function (err) {
              console.log('Error creating the user')
              done(err)
            })
        }
      })
      .catch(function (err) {
        console.log('Error in SignUp: ' +err)
        done(err)
      })
  })
}


function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};


function validPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
};