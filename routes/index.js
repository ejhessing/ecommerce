
const express = require('express')

const router = express.Router()
const db = require("../database/db")
const paypal = require("./paypal")

let config = {}



module.exports = router



router.get('/', function (req,res) {
  res.render(__dirname + '/../views/checkout.hbs')
  //res.send(db.createUser('ejhessing@gmail.com', 'abc123', 'Erwin', '7 Rathgar Rd', 'Auckland', 'NZ', '0610'))
})


router.post("/register", function (req, res) {
  const name = req.body.name
  const address = req.body.address
  const city = req.body.city
  const country = req.body.country
  const postcode = req.body.postcode
  const email = req.body.email
  const password = req.body.password
  db.createUser(email, password, name, address, city, country, postcode)
    .then(function (){
      res.redirect("/thanks")
    })
})

router.get("/thanks", function(req, res) {
  res.send("Thank you for signing up!")
})

router.get("/register", function(req, res) {
  db.getCart()
  .then(function (data){
    res.render(__dirname + '/../views/register.hbs', {data: data})
  })
})

function init(data) {
  config = data
  paypal.configure(data.api)
}

router.get("/create",function(req, res) {
  paypal.create(req, res)
})
router.get("/execute",function(req, res) {
  paypal.execute(req, res)
})

router.get("/cancel", function(req, res){
  res.send("The payment got canceled")
})
