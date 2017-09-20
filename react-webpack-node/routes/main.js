var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', new Date().toLocaleString());
  next();
});

router.get('/', function(req, res) {
  // res.sendfile("./views/index.html");
  res.render('index');
});

router.get('/login-1', function(req, res) {
  res.render('login_1');
});

router.get('/login-2', function(req, res) {
  res.render('login_2');
});

router.get('/demo', function(req, res) {
  res.render('demo');
});

router.get('/test', function(req, res) {
  res.render('test');
});

router.get('/404', function(req, res) {
  // res.send('<h1 style="text-align: center;font-weight: 300;color: #656565;-webkit-font-smoothing: antialiased;">---Page 404---</h1>');
  // res.sendfile("./views/404.html");
  res.render('404');
});

router.get('*', function(req, res){
    res.render('404', {
        title: 'No Found'
    });
    // res.redirect('/404');
});

module.exports = router;
