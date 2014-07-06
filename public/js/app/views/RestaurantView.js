define( ['App', 'backbone', 'marionette', 'jquery', 'handlebars','models/RestaurantModel', 'hbs!templates/restaurant'],
    function(App, Backbone, Marionette, $, HandleBars, Model, template) {

        var View = Backbone.Marionette.ItemView.extend( {
            initialize:function () {

                var hidden = true;
                this.on('showDetails',function(args){
                    if (hidden){
                        this.$('.hide').css('display','inline');
                    } else {
                        this.$('.hide').css('display','none');
                    }
                    hidden = !hidden;
                })

                function saveAndRefresh (rating,view) {

                    view.model.set("myrating",rating).save();
                    App.Data.Ratings.fetch({success: function(collection,response,options) {
                            view.render();
                        },
                        error: function (collection,response,options) {
                            console.log('data retreival error');
                        }
                    });
                }
                // this isn't how you are supposed to do things.
                this.on('nostar',function(){
                    var view = this;
                    saveAndRefresh(0, view);
                })

                this.on('onestar',function(){
                    var view = this;
                    saveAndRefresh(1, view);
                })
                this.on('twostars',function(){
                    var view = this;
                    saveAndRefresh(2, view);
                })
                this.on('threestars',function(){
                    var view = this;
                    saveAndRefresh(3, view);
                })
                this.on('fourstars',function(){
                    var view = this;
                    saveAndRefresh(4, view);
                })
                this.on('fivestars',function(){
                    var view = this;
                    saveAndRefresh(5, view);
                })
            },
            onShow: function(){

                // The 0.06 number is a hack, due to time constraints. It should actually be 5%
                // The DOM it sits in is too long for what it should do.

                var percent = (this.model.get('rating')/0.06)+'%';
                this.$('.countbar').animate({width:percent},1000);
                this.shown = true;
            },
            onDomRefresh: function(){
                if(this.shown){
                    var percent = (this.model.get('rating')/0.06)+'%';
                    this.$('.countbar').animate({width:percent},0);                    
                }
            },
            template: template,
            triggers: {
                "click .title": "showDetails",
                "click .stars-0": "nostar",
                "click .stars-1": "onestar",
                "click .stars-2": "twostars",
                "click .stars-3": "threestars",
                "click .stars-4": "fourstars",
                "click .stars-5": "fivestars"
            }


        });

        HandleBars.registerHelper('stars',function (context,options) {
            console.log('this.myrating',this.myrating);

            var stars = '<div>';

            for (var i = 1; i <= 5; i++) {

                stars = stars + '<span class="fa-stack fa-lg stars-'+i+'">'

                if (this.myrating >= i) {
                    stars = stars + '<i class="fa fa-star fa-stack-1x"></i>'
                } else {
                    stars = stars + '<i class="fa fa-star-o fa-stack-1x"></i>'
                }

                stars = stars + '</span>'
            };

            return stars + '<span class="fa fa-fw"></span><i class="fa fa-fw fa-times fa-lg stars-0"></i></div>'
        })


        return View

    });