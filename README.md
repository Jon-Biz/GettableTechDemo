

! 

Hosted here:

http://restorrant.nodejitsu.com

Client

On load, the client checks for the cookie `uuid`. If it doesn't find one, it generates a unique id for the client  and sets the cookie. Then it used the uuid to retrieve the data payload. So, if you want access the app from a different user, use a different device or delete the cookie.

While the instructions I wanted the opportunity to demonstrate decent motion design and mastering of DOM manipulation. IMHO, we are entering a new era of webpapps, one in which animation is going to be play increasingly important part in interaction design. So, I included a couple of simple animations triggered within Marionnette's onRender and onShow methods. 

The client was built (unfortunately, it turns out) on the BackboneBoiler Plate (XXX). As a result, there's a lot of cruft (particularly in the index.html) that make the code less than readable.

Database API

Database access is via a single Get and Set. Get retrieves the restaurant data, Set updates a rating. 

Get \data\uuid

The Get data retrieves all the restaurants and users from their collections. Iterating through the Restaurants, it tallies and averag their ratings across the Users, and sets this on each restaurant object. Then it returns this as json.

Then it retreives the user from the User collection. If the use does not exist, they are created. 

Set \data\uuid\

and the utakes a user id from the client. The body from the client is the restaurant model including the user's rating. 

If it finds the user in the User database, it retrieves their ratings. 
 
The client considers a rating of zero to be a delete and consequently the server deletes the record, so that it count toward the average score.

The User's data is then updated on the server, and the getdata function is triggered, and returning the new, update data, including the user's recent rating change. 

Schema

If it's not obvious, there are two schemas on the mongodb database: the restaurant one, which holds static restaurant data, and the Users, which holds an array containing a key/value pairs for each restaurant the user has reveiwed.

! Installion

!!Tests

Several things prevented me from doing a proper job. IMHO, TDD is best done when you are entirely familiar with 

However, I wanted to show you my testing style so I build >some< of the project as I would 

So here are my jasmine tests, injecting promises and making use of callback interceptors:
