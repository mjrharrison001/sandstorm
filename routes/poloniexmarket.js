var express = require('express');
var router = express.Router();

var autobahn = require('autobahn');const wsuri = "wss://api.poloniex.com";
var connection = new autobahn.Connection({
  url: wsuri,
  realm: "realm1"
});

router.get('/open', function(req, res, next){
  //connection.open();
  res.send("poloniex");
});

router.get('/close', function(req, res, next){
  //connection.close();
  res.send("poloniex");
});

module.exports = router;



/**
* poloniex methods
**/
connection.onopen = function (session) {
        function marketEvent (args,kwargs) {
                console.log(args);
        }
        function tickerEvent (args,kwargs) {
                console.log(args);
        }
        function trollboxEvent (args,kwargs) {
                console.log(args);
        }
        session.subscribe('BTC_XMR', marketEvent);
        session.subscribe('ticker', tickerEvent);
        session.subscribe('trollbox', trollboxEvent);
}

connection.onclose = function () {
  console.log("Websocket connection closed");
}
