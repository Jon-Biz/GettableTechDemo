var proxyquire = require('proxyquire');
var sinon = require('sinon');
var matchers = require('jasmine-sinon');

var fakedata = require('../fakedata');

describe("joinData", function() {
	  it("should return an array", function() {
	    var result = proxyquire('../joinData',{})();
	    expect(typeof result).toEqual('array');
	  });
});