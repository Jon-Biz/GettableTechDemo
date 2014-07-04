define( ['App', 'backbone', 'marionette', 'jquery', 'handlebars','models/Model', 'hbs!templates/restaurant'],
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


                // this isn't how you are supposed to do things.
                this.on('nostar',function(){
                    this.model.set("myrating",0).save();

                    this.render();
                })

                this.on('onestar',function(){
                    this.model.set("myrating",1).save();
                    this.render();
                })
                this.on('twostars',function(){
                    this.model.set("myrating",2).save();
                    this.render();
                })
                this.on('threestars',function(){
                    this.model.set("myrating",3).save();
                    this.render();
                })
                this.on('fourstars',function(){
                    this.model.set("myrating",4).save();
                    this.render();
                })
                this.on('fivestars',function(){
                    this.model.set("myrating",5).save();
                    this.render();
                })
            },
            onShow: function(){
                var percent = (this.model.get('rating')/0.05)+'%';
                this.$('.countbar').animate({width:percent},1000);
                this.shown = true;
            },
            onDomRefresh: function(){
                if(this.shown){
                    var percent = (this.model.get('rating')/0.05)+'%';
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
                console.log('rating',this.rating);
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