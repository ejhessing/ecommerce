const paypal = require('paypal-rest-sdk')
const db = require("../database/db")
let payID = ''

module.exports = {
  init:init,
  create: create,
  execute: execute
}


function init(data) {
  config = data
  paypal.configure(data.api)
}

function create (req, res, total) {
  let payment = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:3000/execute",
      "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
      "amount": {
        "total": total,
        "currency": "NZD"
      },
      "description": "My awesome payment"
    }]
  }

  paypal.payment.create(payment, function (error, payment) {
    if (error) {
      console.log(error)
    } else {
      if(payment.payer.payment_method === 'paypal') {
        payID = payment.id;
        let redirectUrl
        for(let i=0; i < payment.links.length; i++) {
          let link = payment.links[i]
          if (link.method === 'REDIRECT') {
            redirectUrl = link.href
          }
        }
        res.redirect(redirectUrl);
      }
    }
  })
}

function execute (req, res){
  let paymentId = payID
  let payerId = req.param('PayerID')

  let details = { "payer_id": payerId };
  paypal.payment.execute(paymentId, details, function (error, payment) {
    if (error) {
      console.log(error)
    } else {
      db.getCart()
        .then(function(data){
          db.removeAllFromCart()
          res.render(__dirname + '/../views/thanks.hbs', {payment: payment, data: data})
        })
    }
  })
}
