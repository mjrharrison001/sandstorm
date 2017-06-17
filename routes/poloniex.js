var express   = require('express');
var router    = express.Router();
var CryptoJS  = require('crypto-js');
var crypto = require("crypto");
var request   = require('request');

const api_key = 'I1UYRYFC-Z4HZAGPB-TTYL1K5K-J31F0V78';
const api_secret = 'dac42583fb807bd4d01870c152333ccf4762b5a260ba596cf70abf3b726cf8b456b4197befebc4f158429d26bcbda14d9697c33fe852c34218e5a726b1b6e3b6';
const trading_url = 'https://poloniex.com/tradingApi';
const public_url = 'https://poloniex.com/public';

router.get('/', function(req, res, next){
  // Nonce needs to increase on every request, so just use a unix timestamp
  var nonce = Math.round((new Date()).getTime() / 1000);

  // Using a predefined body string instead of the body param of our options object
  // because annoyingly the poloniex API is sensitive to the parameter order
  var body_string = 'nonce=' + nonce + '&command=returnBalances';

  var encrypted_sign = sign(api_secret, body_string);
  //TODO are we even encrypting properly? 
  console.log(encrypted_sign);
  console.log(body_string);

  var options = {
    method: 'POST',
    jar : true,
    url: trading_url,
    body: body_string,
    headers: {
      'Key': api_key,
      'Sign': encrypted_sign,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  request(options, function (err, response, bodyD) {
    if (err) {
      console.error('error posting json: ', err);
      return res.send('problem with POST request');
    }
    
    var response_body = JSON.parse(bodyD);
    console.log(response_body);

    // Why do they return a 200 even on error?
    // Who knows!
    if (response_body.hasOwnProperty('error')) {
      res.send(bodyD);
    } else {
      res.send("worked!");
    }
  });
});

router.get('/close', function(req, res, next){
  connection.close();
  res.send("poloniex");
});

module.exports = router;

function sign(key, str) {
    var hmac = crypto.createHmac("sha512", key);
    var signed = hmac.update(str).digest("hex");
    return signed
}

function store(){

}
