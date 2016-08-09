var bodyParser = require('body-parser')
var express = require('express')
var path = require('path')


var index = require('./routes/index')

var PORT = process.env.PORT || 3000

var app = express()

app.use('/index', index)
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', index)





app.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
