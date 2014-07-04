console.log('mongo loaded');

var server = 'localhost:27017';
var dbname = 'roastorrant';

var mongoose = require('mongoose');
var q = require('q');

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

			var deferred = q.defer();

			User.findOne({user_id:uid},function (error,user) {
				if(!user){

					var newUser = new User({'user_id':uid,'reviews':[]})
					newUser.save(function (error) {
						if(error) {
							console.error(error)
						}
					});
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
						deferred.resolve(require('./joinData')(users,ratings));
					})
				})
				//retrieve restaurant data
				
				//combine with user data

			})

			return deferred.promise;
		},
		setRating:function (uuid,rating) {
			console.log('uuid',uuid);
			console.log('rating',rating)
			var deferred = q.defer();

			var getRestaurant = q.defer();
			Restaurant.findOne({name:rating.name},function findRestaurant (error,restaurant) {
				console.log('res found',restaurant)
				getRestaurant.resolve(restaurant);
			})
			
			// User.find(function (error,users) {
			// 	console.log(users)
			// })
			
			var getUser = q.defer();
			User.findOne({user_id:uuid},function findUser (error,user) {
				console.log('udrt found',user)
				getUser.resolve(user);
			})

			getRestaurant.promise.then(function (restaurant) {
				getUser.promise.then(function (user) {

					var dupe = false;
					_.each(user.reveiw,function (reveiw) {
						if(_.has(reveiw,restaurant._id)){
							reviews[restaurant._id]=rating.myrating;
						}
					})

					if(!dupe){
						var review = {}
						review[restaurant._id] = rating.myrating										
						user.reviews.push(review)
					}


					console.log('saving');
					User.update({user_id:uuid},{'reviews':user.reviews},function (error,number) {
						console.log('done:',number)
						deferred.resolve();
					})
				})
			})

			return deferred.promise
		}
	})
});

module.exports = dbconnect.promise;

