define([],
	function () {

		var	cname = 'uuid';
		var	exdays = 7;

		function getNewID () {
		    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		      return v.toString(16);
		    });
		  };

		function setCookie() {
			var	cvalue = getNewID();

		    var d = new Date();
		    d.setTime(d.getTime() + (exdays*24*60*60*1000));
		    var expires = "expires="+d.toGMTString();
		    document.cookie = cname + "=" + cvalue + "; " + expires;
		    return cvalue;
		}

		function getCookie() {
		    var name = cname + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0; i<ca.length; i++) {
		        var c = ca[i].trim();
		        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		    }
		    return "";
		}

	    var user = getCookie();
	    if (user != "") {
	    	return user;
	    } else {
        return setCookie();
	    }
	})