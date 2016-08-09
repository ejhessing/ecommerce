

var express = require('express')
var Router = express.Router()

module.exports = Router

Router.get('/', function (req,res) {
  res.send("connected")
})
