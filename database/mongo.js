var server = 'localhost:27017'

var mongoose = require('mongoose');
var q = require('q');

var fakedata = require('./fakedata');

var db = mongoose.connection;
db.on('error', console.error);

mongoose.connect('mongodb://'+server);

var restaurantSchema = new mongoose.Schema({
	restaurant_id:String,
	restaurant_title:String
})
var userSchema = new mongoose.Schema({
	user_id:String,
	reviews:Array
});

var User = mongoose.model('Users', userSchema);

var Restaurant = mongoose.model('Restaurant',restaurantSchema);

var dbconnect = q.defer();

db.once('open', function() {

	dbconnect.resolve({
		getRatings:function (uid) {

			var deferred = q.defer();

			User.findOne({uid:uid},function (error,success) {
				// if(success !== 'null'){
				// }else {

				// }
				// console.log('error',error),
				// console.log('success',success)
				deferred.resolve(fakedata);
			})

			return deferred.promise;
		},
		setRating:function (rating) {
			var deferred = q.defer();

			return deferred.promise
		}
	})
});


module.exports = dbconnect.promise;

