const fs = require('fs')

module.exports = function(paypal) {
   try {
     var configJSON = fs.readFileSync(__dirname + "/config.json");
     var config = JSON.parse(configJSON.toString());
   } catch (err) {
     console.log("File config.json not found or is invalid " + err.message);
     process.exit(1)
   }
   paypal.init(config)

}