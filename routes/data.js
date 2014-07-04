var express = require('q');
var express = require('express');
var router = express.Router();

var getRestaurants = require('../database/mongo');

router.get('/:uid/:rid',function (req,res) {
 res.send('here you go'+req.params.rid);
})

router.get('/:uid', function(req, res) {
	getRestaurants.then(function (data) {
		data.getRatings('123').then(function(ratings){
			res.setHeader('Content-Type', 'application/json');
		  res.end(JSON.stringify(ratings, null, 3));			
		});
	})
});

module.exports = router;
