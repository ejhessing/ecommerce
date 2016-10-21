const passport         = require('passport')
const LocalStrategy    = require('passport-local').Strategy
const configureAuth    = require('./configureAuth')
const db               = require('../database/db')

module.exports = function(passport) {
   
   passport.serializeUser(function(user, done) {
     done(null, user.id)
   })
   
   passport.deserializeUser(function(id, done) {
     const user = id[0] || id 
     db.getUserById(user)
       .then(function(users) {
         done(null, users)
       })
       .catch(function(err) {
         done(err)
       })
   })
   
   passport.use('login', new LocalStrategy({
       passReqToCallback : true
     }, configureAuth.loginStrategy))
     
   passport.use('signup', new LocalStrategy({
     usernameField : 'email',
     passwordField : 'password',
     passReqToCallback: true
   }, configureAuth.registerStrategy))

}