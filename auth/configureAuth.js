var db = require('../database/db')

module.exports = {
  loginStrategy: loginStrategy,
  registerStrategy: registerStrategy
}


function loginStrategy (username, password, done) {
  console.log("helloooooo" + username + " " + password)
  db.findByLogin(username)
    .then(function (users) {
      console.log(users)
      if (!users || !users[0]) {
        console.log('Incorrect username.')
        done(null, false, { message: 'Incorrect username.' })
      } else if (users[0].password !== password) {
        done(null, false, { message: 'Incorrect password.' })
      } else {
        done(null, users[0])
      }
    })
    .catch(function (err) {
      done(err)
    })
}

function registerStrategy (req, username, password, done) {
  function findOrCreateUser () {
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
          db.createUser(email, password, name, address, city, country, postcode)
            .then(function (users) {
              done(null, users[0])
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
  }
  // Delay the execution of findOrCreateUser and execute
  // the method in the next tick of the event loop
  process.nextTick(findOrCreateUser)
}
