const bodyParser = require('body-parser')
const express = require('express')
const express = require('express-handlebars')
const path = require('path')


const index = require('./routes/index')

const PORT = process.env.PORT || 3000

const app = express()

app.use('/index', index)
app.engine('hbs', hbs())
app.set('view engine', 'hbs')
app.set('views', __dirname + "/views")
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', index)





app.listen(PORT, function () {
  console.log('Listening on port: ', PORT)
})
