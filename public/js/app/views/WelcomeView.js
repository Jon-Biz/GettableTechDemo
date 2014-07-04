define( ['App', 'backbone', 'marionette', 'jquery', 'handlebars','models/Model', 'hbs!templates/welcome'],
    function(App, Backbone, Marionette, $, HandleBars, Model, template) {

        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template
        });
    });