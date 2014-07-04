define(["jquery","backbone","models/RestaurantModel","helpers/getUser"],
  function($, Backbone, RestaurantModel,User) {

    var Collection = Backbone.Collection.extend({
      model: RestaurantModel,
      url: '/data/'+User
    });

    return Collection;
  });