var express = require('express');
var router = express.Router();
var sjs = require('shelljs');

/* GET home page. */
router.get('/', function(req, res) {
  sjs.exec('head -n 1 ../package.json', function (code, output) {
    res.render('angul', { cont: output.trim() });
  });
});

module.exports = router;
