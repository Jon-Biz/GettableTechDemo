var express = require('q');
var express = require('express');
var router = express.Router();

var getRestaurants = require('../database/mongo');


router.get('/:uid', function(req, res) {
	getRestaurants.then(function (data) {
		data.getRatings(req.cookies.uuid).then(function(ratings){
			res.setHeader('Content-Type', 'application/json');
		  res.end(JSON.stringify(ratings, null, 3));			
		});
	})
})

module.exports = router;
