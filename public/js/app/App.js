define(['jquery', 'backbone', 'marionette', 'underscore', 'handlebars','collections/RatingCollection'],
    function ($, Backbone, Marionette, _, Handlebars, RatingCollection) {
        var App = new Backbone.Marionette.Application();

        function isMobile() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
        }

        //Organize Application into regions corresponding to DOM elements
        //Regions can contain views, Layouts, or subregions nested as necessary
        App.addRegions({
            headerRegion:"header",
            mainRegion:"#main"
        });

        App.addInitializer(function () {
            Backbone.history.start();
        });

        App.Data = {};

        App.dataReady = new Backbone.Marionette.Callbacks();

        App.Data.Ratings = new RatingCollection();

        App.Data.Ratings.fetch({success: function(collection,response,options) {
            App.dataReady.run();     
            },
            error: function (collection,response,options) {
                console.log('data retreival error');
            }
        });

        App.mobile = isMobile();

        return App;
    });