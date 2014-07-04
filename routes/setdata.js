var mongo = require('../database/mongo');

module.exports = function (req,res) {

	console.log('cookie',req.cookies.uuid)
	mongo.then(function(db){
		db.setRating(req.cookies.uuid,req.body).then(function () {
		 console.log(req.body);
		 res.send('ok')
		});	
	});
}