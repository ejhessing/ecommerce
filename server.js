const bodyParser = require('body-parser')
const express = require('express')
const hbs = require('express-handlebars')
const session = require('express-session')
const fs = require('fs')

const passport = require('passport')
const flash = require('connect-flash')

const index = require('./routes/index')
const cart = require('./routes/cart_routes')
const paypal = require("./routes/paypal")

const PORT = process.env.PORT || 3000
const SESSION_KEY = process.env.SESSION_KEY || "Nikau"

const app = express()


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

require('./auth/passport')(passport) //set up passport

//the two routes that use passport
app.post("/login", passport.authenticate('login', {
  successRedirect : 'profile',
  failureRedirect : 'login'
}))

app.post('/checkout', passport.authenticate('signup', {
    successRedirect : 'create',
    failureRedirect : 'sorry',
    failureFlash : true
}))

app.use("/", cart)
app.use("/", index)


require('./paypal/setup')(paypal) //set up paypal



app.listen(PORT, function () {
  console.log('Listening on port: ', PORT)
})
