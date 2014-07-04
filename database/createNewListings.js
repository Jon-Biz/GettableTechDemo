var _ = require('underscore');

module.exports = function createNewListings (Restaurant) {
	_.each(require('./fakedata'),function (item) {
		var restaurant = new Restaurant(item)
		restaurant.save(function (error) {
			console.log(error)
		})
	})
}



