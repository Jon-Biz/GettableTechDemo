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

describe("mongo service", function() {

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

		  expect(spy).toHaveBeenCalledWith('mongodb://localhost:27017/roastorrant');
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
				db_Connect = function(){
					call_interceptor.args[0][1]();
				}
				//execute callback
			});

			afterEach(function() {
			  call_interceptor.restore();			  
			});

			it("should return a function", function(done) {

				db = setUpMongo();
				db_Connect();

				db.then(function (result) {
					expect(typeof result).toEqual('object');
					done();
				});
			});
				  
		});		
	});

	describe("mongo.getRatings", function() {

		var db, db_Connect,call_interceptor,mongo;

		beforeEach(function() {
			// wrap async retreival of functions
			call_interceptor =	sinon.spy(mongoose.connection,"once");

			db_Connect = function(){
				call_interceptor.args[0][1]();
			}
		});

		afterEach(function() {
		  call_interceptor.restore();			  
		});
	  
	  it("should be defined", function(done) {
			db = setUpMongo();
			db_Connect();

			db.then(function (mongo) {
		  	expect(mongo.getRatings).toBeDefined();
				done();
			})
	
	  });

	  describe("when called", function() {

	  	var mock,stub,spy;

	  	beforeEach(function() {
		  	spy = sinon.spy();
			  mock = {findOne:spy};
		  	stub = sinon.stub(mongoose,'model').returns(mock);	  	  

				db = setUpMongo();
				db_Connect();
	  	});

	  	afterEach(function() {
	  	  stub.restore();
	  	});

			it("should return a promise", function(done) {
				db.then(function (mongo) {
			  	expect(mongo.getRatings().then).toBeDefined();
					done();
				})
	    });	    

		  it("should call the find method on the User model with it's parameter and a callback", function(done) {
				db.then(function (mongo) {
					mongo.getRatings('123');
			  	expect(spy).toHaveBeenCalled();
			  	expect(spy.args[0][0]).toEqual({user_id:'123'});
			  	expect(typeof spy.args[0][1]).toEqual('function');
					done();
				})
		  });
	  });
	  xdescribe("when User.findOne responds with null", function() {
	  	var mock,stub,user_search;

	  	beforeEach(function(done) {
		  	interceptor = sinon.spy();
		  	user_search = function () {
		  		console.log(interceptor.args[0])
		  		interceptor.args[0][1]('null','null');
		  	}

			  modelspy = sinon.spy();
			  modelspy.findOne = interceptor;
		  	stub = sinon.stub(mongoose,'model').returns(modelspy);	  	  

				db = setUpMongo();
				db_Connect();

				db.then(function (mongo) {
					mongo.getRatings('123').then(function () {
						user_search();
						done();
					});
				})

	  	});

	  	afterEach(function() {
	  	  stub.restore();
	  	});

	    it("should call User with new", function() {
	      expect(modelspy.calledWithNew()).toBeTruthy();
	    });
	  });
	});
});