var express = require('q');
var express = require('express');
var router = express.Router();

var restaurants = require('../database/mongo');

router.get('/:uid/:rid',function (req,res) {
 res.send('here you go'+req.params.rid);
})

router.get('/:uid', function(req, res) {
	console.log("hit")
	restaurants.then(function (data) {
		data('123').then(function(rest){
			console.log('rest',rest)
			res.setHeader('Content-Type', 'application/json');
		  res.end(JSON.stringify(rest, null, 3));			
		});
	})
});

module.exports = router;
