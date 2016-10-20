const bodyParser = require('body-parser')
const express = require('express')
const hbs = require('express-handlebars')
const session = require('express-session')
const path = require('path')
const fs = require('fs')
const db = require("./database/db")


const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const configureAuth = require('./auth/configureAuth')
const flash = require('connect-flash')

const index = require('./routes/index')
const paypal = require("./routes/paypal")

const PORT = process.env.PORT || 3000
const SESSION_KEY = process.env.SESSION_KEY || "Nikau"

const app = express()

//HBS
app.engine('hbs', hbs())
app.set('view engine', 'hbs')
app.set('views', __dirname + "/views")

app.use('/index', index)
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

app.set('trust proxy', 1)
app.use(session({
  secret: 'SESSION_KEY'
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

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

app.post("/login", passport.authenticate('login', {
  successRedirect : 'profile',
  failureRedirect : 'login'
}))

app.post('/checkout', passport.authenticate('signup', {
    successRedirect : '/create',
    failureRedirect : '/sorry',
    failureFlash : true
}))

app.use("/", index)


//paypal
try {
  var configJSON = fs.readFileSync(__dirname + "/config.json");
  var config = JSON.parse(configJSON.toString());
} catch (err) {
  console.log("File config.json not found or is invalid " + err.message);
  process.exit(1)
}
paypal.init(config)


app.listen(PORT, function () {
  console.log('Listening on port: ', PORT)
})
