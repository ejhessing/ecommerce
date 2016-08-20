const paypal = require('paypal-rest-sdk')
let payID = ''

module.exports = {
  init:init,
  create: create,
  execute:execute
}


function init(data) {
  config = data
  paypal.configure(data.api)
}

function create (req, res, total) {
  var payment = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:3000/execute",
      "cancel_url": "/cancel"
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
        var redirectUrl
        for(var i=0; i < payment.links.length; i++) {
          var link = payment.links[i]
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
  var paymentId = payID
  var payerId = req.param('PayerID')

  var details = { "payer_id": payerId };
  paypal.payment.execute(paymentId, details, function (error, payment) {
    if (error) {
      console.log(error)
    } else {
      console.log("**********************")
      console.log(payment.transactions[0].amount)
      console.log(payment)
      res.render(__dirname + '/../views/thanks.hbs', {data: payment})
    }
  })
}
