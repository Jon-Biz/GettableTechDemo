var _ = require('underscore');

module.exports = function joinData (users, restaurants) {


	var ratedRestaurants = [];

	_.each(restaurants,function combineScores (restaurant) {
		var count=0;
		var ratings=0;

		_.each(users,function pluckRating (user) {
			_.each(user.reviews,function checkReviews (review) {
				//console.log(review);
				if(_.has(review,restaurant._id)){

					count++;
					ratings = ratings + review[restaurant._id];
				}				
			})
		})

		var rating = (ratings/count)||0
		ratedRestaurants.push({
			'name':restaurant.name,
			'review':restaurant.review,
			'count':count,
			'rating':rating,
			'myrating':0
		});

	})

	return (ratedRestaurants);
}
