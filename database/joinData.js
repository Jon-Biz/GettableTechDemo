var _ = require('underscore');

module.exports = function joinData (current_user, users, restaurants) {

	var ratedRestaurants = [];

	_.each(restaurants,function combineScores (restaurant) {
		var count=0;
		var ratings=0;
		var myrating; 

		_.each(users,function pluckRating (user) {
			_.each(user.reviews,function checkReviews (review) {
				if(_.has(review,restaurant._id)){
					count++;
					ratings = ratings + review[restaurant._id];
					console.log('user',user._id);
					console.log('current user',current_user._id);
					
					if(user._id.equals(current_user._id)){
						myrating = review[restaurant._id];
					};
				}				
			})
		})

		var rating = (ratings/count)||0;

		ratedRestaurants.push({
			'name':restaurant.name,
			'review':restaurant.review,
			'count':count,
			'rating':rating,
			'myrating':myrating
		});

	})

	return (ratedRestaurants);
}
