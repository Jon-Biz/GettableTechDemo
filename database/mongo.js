console.log('mongo loaded');

var server = 'localhost:27017';
var dbname = 'roastorrant';

var mongoose = require('mongoose');
var q = require('q');
var _ = require('underscore');
var db = mongoose.connection;
db.on('error', console.error);

mongoose.connect('mongodb://'+server+'/'+dbname);

var restaurantSchema = new mongoose.Schema({
	name:String,
	review:String,
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

			var deferRatings = q.defer();

			User.findOne({user_id:uid},function (error,user) {
				if(!user){

					var newUser = new User({'user_id':uid,'reviews':[]})
					newUser.save(function (error) {
						if(error) {
							console.error(error)
						}
					});
					user = newUser;
				}

				var getUsers = q.defer();
				User.find(function (error, users) {
					getUsers.resolve(users);
				})

				var getRatings = q.defer();
				Restaurant.find(function (error,ratings) {

					//quick chop so I can reset everything just by pointing it at a blank database
					if(!ratings.length){
						require('./createNewListings')(Restaurant);
					};

					getRatings.resolve(ratings);
				})

				getUsers.promise.then(function (users) {
					getRatings.promise.then(function (ratings) {
						deferRatings.resolve(require('./joinData')(user,users,ratings));
					})
				})
				
			})

			return deferRatings.promise;
		},
		setRating:function (uuid,rating) {
			var deferred = q.defer();

			var getRestaurant = q.defer();
			Restaurant.findOne({name:rating.name},function findRestaurant (error,restaurant) {
				getRestaurant.resolve(restaurant);
			})
						
			var getUser = q.defer();
			User.findOne({user_id:uuid},function findUser (error,user) {
				getUser.resolve(user);
			})

			getRestaurant.promise.then(function (restaurant) {
				getUser.promise.then(function (user) {
					var dupe = false;

					_.each(user.reviews,function (review,index) {
						if(_.has(review,restaurant._id)){
							review[restaurant._id] = rating.myrating;

							//remove zero ratings
							if(rating.myrating == 0){
								user.reviews.splice(index,1);
							}
							dupe = true;
						}
					})

					if(!dupe && !(rating.myrating == 0)){
						var review = {};
						review[restaurant._id] = rating.myrating										
						user.reviews.push(review);
					}

					User.update({user_id:uuid},{'reviews':user.reviews},function (error,number) {
						deferred.resolve();
					})
				})
			})

			return deferred.promise
		}
	})
});

module.exports = dbconnect.promise;

