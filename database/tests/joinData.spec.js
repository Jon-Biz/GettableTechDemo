var proxyquire = require('proxyquire');
var sinon = require('sinon');
var matchers = require('jasmine-sinon');

var fakedata = require('../fakedata');

var fakeUsers1 = [{reviews:[{'505bd76785ebb509fc183733':3}]}];
var fakeUsers2 = [{
	reviews:[
		{'505bd76785ebb509fc183733':3}
	]},
	{
	reviews:[
		{'505bd76785ebb509fc183733':4}
		]
	}
	]

describe("joinData", function() {
	  it("should return an array", function() {
	    var result = proxyquire('../joinData',{})();
	    expect(Array.isArray(result)).toBeTruthy();
	  });

	  describe("when it is given fake users and data", function() {

	    it("should return a restaurant list with counts, rating, myrating ", function() {
		    var result = proxyquire('../joinData',{})(fakeUsers1,fakedata);
	      expect(result[0].count).toBeDefined();
	      expect(result[0].rating).toBeDefined();
	      expect(result[0].myrating).toBeDefined();
	    });

	    it("should return user rating for av rating when count is 1", function() {
		    var result = proxyquire('../joinData',{})(fakeUsers1,fakedata);
	      expect(result[0].count).toEqual(1);
	      expect(result[0].rating).toEqual(3);
	      
	    });

	    it("should return 0 for av rating when count is 0", function() {
		    var result = proxyquire('../joinData',{})(fakeUsers1,fakedata);
	      expect(result[1].count).toEqual(0);
	      expect(result[1].rating).toEqual(0);
	      
	    });
	    it("should return average user rating when count is 2", function() {
		    var result = proxyquire('../joinData',{})(fakeUsers2,fakedata);
	      expect(result[0].count).toEqual(2);
	      expect(result[0].rating).toEqual(3.5);
	      
	    });

	  });
});