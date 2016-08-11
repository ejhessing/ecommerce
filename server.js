const bodyParser = require('body-parser')
const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')

const index = require('./routes/index')

const PORT = process.env.PORT || 3000

const app = express()

//HBS
app.engine('hbs', hbs())
app.set('view engine', 'hbs')
app.set('views', __dirname + "/views")

app.use('/index', index)
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', index)
app.get('/thanks', index)
app.get('/register', index)
app.post('/register', index)
//
// app.post("/checkout", index)



app.listen(PORT, function () {
  console.log('Listening on port: ', PORT)
})
