
var express = require('express')
var Router = express.Router()
var db = require("../database/db")

module.exports = Router

Router.get('/', function (req,res) {
  res.send(db.createUser('ejhessing@gmail.com', 'abc123', 'Erwin', '7 Rathgar Rd', 'Auckland', 'NZ', '0610'))
})
