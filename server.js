const bodyParser = require('body-parser')
const express = require('express')
const hbs = require('express-handlebars')
const session = require('express-session')
const path = require('path')
const fs = require('fs')


const index = require('./routes/index')
const paypal = require("./routes/paypal")

const PORT = process.env.PORT || 3000

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
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure:true }
}))


app.use("/", index)


//paypal
try {
  var configJSON = fs.readFileSync(__dirname + "/config.json");
  var config = JSON.parse(configJSON.toString());
  //let config = JSON.parse(configJSON.toString());
} catch (err) {
  console.log("File config.json not found or is invalid " + err.message);
  process.exit(1)
}
paypal.init(config)


app.listen(PORT, function () {
  console.log('Listening on port: ', PORT)
})
