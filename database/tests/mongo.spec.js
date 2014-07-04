var proxyquire = require('proxyquire');
var sinon = require('sinon');
var matchers = require('jasmine-sinon');

var mongoose = {
	"connection":{
		"on":function () {},
		"once":function () {},			
	},
	'connect':function () {},
	'Schema':function() { return{}},
	'model':function() { return{}},

	'@noCallThru': true
}

var setUpMongo = function () {
  return proxyquire('../mongo',{'mongoose':mongoose});
};

describe("the mongo connection service", function() {

	it("should be defined", function() {
		var db = setUpMongo();
		expect(db).toBeDefined();
	});

	it("should return a promise", function() {
		var db = setUpMongo();
	  expect(db.then).toBeDefined();
	});

	describe("when initialized", function() {
	  

		it("should set an error response", function() {
			var spy =	sinon.spy(mongoose.connection,"on");
			setUpMongo();

		  expect(spy).toHaveBeenCalledWith('error',console.error);
		  spy.restore();
		});

		it("should connect to mongoose with the server info", function() {
			var spy =	sinon.spy(mongoose,"connect");
			setUpMongo();

		  expect(spy).toHaveBeenCalledWith('mongodb://localhost:27017');
		  spy.restore();
		});

		it("should create User and Restaurant Schema", function() {
			var spy =	sinon.spy(mongoose,"model");
			setUpMongo();

		  expect(spy).toHaveBeenCalledTwice();
		  spy.restore();
		});

		it("should call set a callback for when the database opens", function() {
			var spy =	sinon.spy(mongoose.connection,"once");
			setUpMongo();

			var args = spy.args[0];
		  expect(args[0]).toEqual('open');
		  expect(typeof args[1]).toEqual('function');

		  spy.restore();			  
		});

		describe("when the database connection has opened and callback executes", function() {

			var db, dbConnect,call_interceptor;

			beforeEach(function() {
				call_interceptor =	sinon.spy(mongoose.connection,"once");
				db = setUpMongo();
				db_Connect = call_interceptor.args[0][1];
				//execute callback
			});

			afterEach(function() {
			  call_interceptor.restore();			  
			});

			it("should be a resolved promise", function() {
			  
			});
			it("should return a function", function(done) {
				db_Connect();
				returned_arg = db.then(function (result) {
					expect(typeof result).toEqual('function');
					done();
				});
			});
				  
		});		
	});



	// describe("when it is called with a string", function() {
	// 	beforeEach(function() {
	// 	  mongoose.findOne = sinon.spy()
	// 	});
	//   it("should call mongoose.findOne with that string", function() {
	//   	db('123')
	//     expect(mongoose.findOne).toHaveBeenCalled();;
	//   });
	// });
});