var user = 


var getData = function(uid){

	require('./mongo').then(function (data) {
		return data
	});

}


module.exports = getData;
