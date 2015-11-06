'use strict';

var express = require('express'),
		router  = express.Router();

router.get('/', function(req, res, next) {
	res.redirect('/home');
});

router.get('/home', function(req, res, next) {
	if(process.env.NODE_ENV === 'production'){
		res.sendfile(__dirname + '/build/home.html');
	}else{
		res.sendfile(__dirname + '/home.html');
	}
});

module.exports = router;