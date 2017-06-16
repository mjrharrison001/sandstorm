var express   = require('express');
var router    = express.Router();
var CryptoJS  = require('crypto-js');
var crypto = require("crypto");
var request   = require('request');

const api_key = 'I1UYRYFC-Z4HZAGPB-TTYL1K5K-J31F0V78';
const api_secret = 'dac42583fb807bd4d01870c152333ccf4762b5a260ba596cf70abf3b726cf8b456b4197befebc4f158429d26bcbda14d9697c33fe852c34218e5a726b1b6e3b6';
const trading_url = 'https://poloniex.com/tradingApi';
const public_url = 'https://poloniex.com/public';

var nonce = 1;

router.get('/', function(req, res, next){
  var sign = [
    {command: 'returnBalances'},
    {nonce: nonce}
  ];

  encrypted_sign = encrypt(JSON.stringify(api_secret), sign);
  //TODO are we even encrypting properly? 
  console.log(sign);
  console.log(encrypted_sign);

  var options = {
    method: 'POST',
    jar : true,
    json: true,
    url: trading_url,
    form: {command: 'returnBalances'}
    headers: {
      'Key': api_key,
      'Sign': encrypted_sign
    }
  }
  request(options, function (err, response, bodyD) {
    if (err) {
      console.error('error posting json: ', err);
      return res.send('problem with POST request');
    }
    console.log(bodyD);
    res.send("worked!")
  });
});

router.get('/close', function(req, res, next){
  connection.close();
  res.send("poloniex");
});

module.exports = router;

function encrypt(key, str) {
    var hmac = crypto.createHmac("sha512", key);
    var signed = hmac.update(new Buffer(str, 'utf-8')).digest("base64");
    return signed
}

function store(){

}
