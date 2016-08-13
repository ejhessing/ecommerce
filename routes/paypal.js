const paypal = require('paypal-rest-sdk')

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
      "return_url": "/thanks",
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
        console.log(req.session.paymentId + " " + payment.id)
        req.session.paymentId = payment.id;
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
  var paymentId = req.session.paymentId
  var payerId = req.param('PayerID')

  var details = { "payer_id": payerId };
  paypal.payment.execute(paymentId, details, function (error, payment) {
    if (error) {
      console.log(error)
    } else {
      res.send("Hell yeah!")
    }
  })
}
