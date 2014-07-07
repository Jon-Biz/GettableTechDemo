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

            // this is a hack.
            // I'm so proud of my spinning 'waiting' icon
            // that I can't bear the idea that a 
            // speedy DB response will make you miss it.
            // So, I am forcing the system to wait an extrea second so you see it.
                window.setTimeout(function () {
                    var RatingView = new RatingsView();
                    App.mainRegion.show(RatingView);
                },1000);
            });

        }
    });
});