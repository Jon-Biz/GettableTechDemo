define(['App', 'backbone', 'marionette', 'views/WelcomeView', 'views/DesktopHeaderView','collections/RatingCollection','views/RatingsView'],
    function (App, Backbone, Marionette, WelcomeView, DesktopHeaderView,RatingCollection,RatingsView) {

    return Backbone.Marionette.Controller.extend({
        initialize:function (options) {
            App.headerRegion.show(new DesktopHeaderView());
        },

        //gets mapped to in AppRouter's appRoutes
        index:function () {
            App.mainRegion.show(new WelcomeView());

            App.dataReady.add(function(options){
                var RatingView = new RatingsView();
                App.mainRegion.show(RatingView);
            });

        }
    });
});