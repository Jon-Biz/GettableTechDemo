var proxyquire = require('proxyquire');
var sinon = require('sinon');
var matchers = require('jasmine-sinon');

//stub of mongo id function
//There are probably much better ways 
//to do this such as Mongoose-mock, mockgoose.

var Mongoose_id = function (id) {
	this.id = id;

	return {
		equals : function (other) {
			if(other == this.id){
				return true;
			}else{
				return false;
			}
		},
		id: this.id
	}
}

// fake restaurant data
var fakedata = [
		{
	   		"_id":"505bd76785ebb509fc183733",
	      "name": "Apple PieHhouse",
	      "review": "Lots of apples here. The review"
	   },

	   {
	   		"_id":"505bd76785ebb509fc183734",
	      "name": "Other Kind of PieHouse",
	   		'review': 'A pie house'
	   }]


//fake current user, fake users
var fakeUser = [{'reviews':[{'505bd76785ebb509fc183733':3}]}];
fakeUser[0]._id = new Mongoose_id('123')

var fakeUsers1 = [{'reviews':[{'505bd76785ebb509fc183733':3}]}];
fakeUsers1[0]._id = new Mongoose_id('123')

var fakeUsers2 = [
	{'reviews':[{'505bd76785ebb509fc183733':3}]},
	{'reviews':[{'505bd76785ebb509fc183733':4}]}
]

fakeUsers2[0]._id = new Mongoose_id('123')
fakeUsers2[1]._id = new Mongoose_id('456')


describe("joinData", function() {
	  it("should return an array", function() {
	    var result = proxyquire('../joinData',{})();
	    expect(Array.isArray(result)).toBeTruthy();
	  });

	  describe("when it is given fake users and data", function() {

	    it("should return a restaurant list with counts, rating, myrating ", function() {
		    var result = proxyquire('../joinData',{})(fakeUser,fakeUsers1,fakedata);
		    console.log(result[0])
	      expect(result[0].count).toBeDefined();
	      expect(result[0].rating).toBeDefined();
	    });

	    it("should return user rating for av rating when count is 1", function() {
		    var result = proxyquire('../joinData',{})(fakeUser,fakeUsers1,fakedata);
	      expect(result[0].count).toEqual(1);
	      expect(result[0].rating).toEqual(3);
	      
	    });

	    it("should return 0 for av rating when count is 0", function() {
		    var result = proxyquire('../joinData',{})(fakeUser,fakeUsers1,fakedata);
	      expect(result[1].count).toEqual(0);
	      expect(result[1].rating).toEqual(0);
	      
	    });
	    it("should return average user rating when count is 2", function() {
		    var result = proxyquire('../joinData',{})(fakeUser,fakeUsers2,fakedata);
	      expect(result[0].count).toEqual(2);
	      expect(result[0].rating).toEqual(3.5);
	      
	    });

	  });
});
