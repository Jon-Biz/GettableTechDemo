var server = 'localhost:27017'

var mongoose = require('mongoose');
var q = require('q');

var fakedata = require('./fakedata');

var db = mongoose.connection;
db.on('error', console.error);

mongoose.connect('mongodb://'+server+'/roastorrant');

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

			User.findOne({user_id:uid},function (error,success) {
				//if no user, make one
				console.log('success',success)
				if(success == null){
						console.log('usernew calling');
					var newUser = new User({'user_id':uid,'reviews':[]})
						console.log('usernew called');

					newUser.save(function (error,newUser) {
						if(error) {
							console.error(err)
						}else {
							console.log('success!!');
						}
					});
				}

				var getUsers = q.defer();
				User.find(function (error, users) {
					getUsers.resolve(users);
				})

				var getRatings = q.defer();
				Restaurant.find(function (error,ratings) {
					getRatings.resolve(ratings);
				})

				getUsers.promise.then(function (users) {
					getRatings.promise.then(function (ratings) {
						deferred.resolve(require('./joinData')(users,ratings));
					})
				})
				//retrieve restaurant data
				
				//combine with user data

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

