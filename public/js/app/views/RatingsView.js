define( ['App', 'backbone', 'marionette', 'jquery', 'views/restaurantview'],
    function(App, Backbone, Marionette, $,RestaurantView) {

        //ItemView provides some default rendering logic
        return Backbone.Marionette.CollectionView.extend( {
            itemView: RestaurantView,
            collection: App.Data.Ratings,

            // View Event Handlers
            events: {

            }
        });
    });