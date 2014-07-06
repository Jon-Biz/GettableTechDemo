define( ['App', 'backbone', 'marionette', 'jquery', 'handlebars','hbs!templates/welcome'],
    function(App, Backbone, Marionette, $, HandleBars, template) {

        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template
        });
    });