var express = require('express');
var router = express.Router();
var sjs = require('shelljs');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('tsapp');
});

module.exports = router;
