var express   = require('express');
var router    = express.Router();
var CryptoJS  = require('crypto-js');
var request   = require('request');
var PythonShell = require('python-shell');

const api_key = 'I1UYRYFC-Z4HZAGPB-TTYL1K5K-J31F0V78';
const api_secret = 'dac42583fb807bd4d01870c152333ccf4762b5a260ba596cf70abf3b726cf8b456b4197befebc4f158429d26bcbda14d9697c33fe852c34218e5a726b1b6e3b6';
const trading_url = 'https://poloniex.com/tradingApi';
const public_url = 'https://poloniex.com/public';

var nonce = 1;

router.get('/', function(req, res, next){

  PythonShell.run('scripts/my_script.py', function (err) {
    if (err) throw err;
    console.log('finished');
    res.send("test");
  });

});

router.get('/close', function(req, res, next){
  connection.close();
  res.send("poloniex");
});

module.exports = router;


function store(){
  var sign = {
    command: 'returnBalances',
    nonce: nonce
  }
  console.log(sign.command);
  encrypted_sign = CryptoJS.HmacSHA512(sign, api_secret);
  //console.log(encrypted_sign);

  var options = {
    method: 'POST',
    jar : true,
    json: true,
    url: trading_url,
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
}
