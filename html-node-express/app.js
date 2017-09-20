var express = require('express');
var app = express();
var request = require('request');
var fs= require("fs");
var ejs=require('ejs');

app.use(express.static('public'));

app.engine('html', ejs.__express);  // app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

var mainRouter = require('./routes/main.js');
app.use('/', mainRouter);

/**
* API
*/
app.post('/project', function (req, res) {
  request('http://api.zwdai.com/project/index', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data=JSON.parse(body);
      res.send(data);
    }else{
      res.json({"code":"400","data":"","message":error});
    }
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
