
# Roast or Rant? 
*A tech demo for Gettable.com*

## Try it out

**Hosted here:** http://slobotnik.no-ip.info:3000

*NOTE: I've noticed that on the iphone, the stars are too close to the 'delete rating' button, and so you can accidentally touch it when you mean to press '5 stars'.*

## Client

On load, the client checks for the cookie `uuid`. If it doesn't find one, it generates a unique id for the client and sets the cookie. Then it uses the uuid to retrieve the data payload. So, if you want access the app from a different user, use a different device or delete the cookie.

While the instructions were not bother with 'designing' the app, I wanted the opportunity to demonstrate decent motion design and integration of DOM manipulation with marionette's view system. So, I included a couple of simple animations triggered within Marionnette's onRender and onShow methods (Oh, and the spinning 'loading' icon while the database is accessed).

The client was built (unfortunately, it turns out) on the Backbone-Marionette Boiler Plate project. As a result, there's a lot of cruft (particularly in the index.html) that make the code less than readable, that I didn't have time to weed through :( It added requirejs though, which I had not used with backbone before, and was nice.

## Database API

Database access is via a single Get and Set. Get retrieves the restaurant data, Set updates a single rating. 

###GET `\data\uuid`

The Get data retrieves all the restaurants and users from their collections. Then it retreives the User using the `uuid` and the User collection. If the use does not exist, they are created.

Iterating through the Restaurants, it tallies and average their ratings across the Users, and sets this on each restaurant object. Then it returns this as json to the client.

###SET `\data\uuid`

This sets a rating for the user. The body from the client is the restaurant model including the user's rating. 

If it finds the user in the User database, it retrieves the rating and update it. Otherwise it sets it.
 
The client considers a rating of zero to be a delete and consequently the server deletes the record, so that it count toward the average score.

The User's data is then updated on the server, and the getdata function is triggered, and returning the new, update data, including the user's recent rating change. 

## Schema

If it's not obvious, there are two schemas on the mongodb database: the restaurant one, which holds static restaurant data, and the Users, which holds an array containing a key/value pairs for each restaurant the user has reveiwed.

##Tests

Since time constraints prevented me from doing a proper job, I didn't test most of this project :( However, I wanted to show you how I would work when working with production code, so I build out >some< of the project as I would if I expected myself or others to be re-visiting it. Here are some jasmine tests of the data joining and database access modules, injecting promises and making use of callback interceptors:

https://github.com/Jon-Biz/GettableTechDemo/tree/master/database/tests

To run them, clone the project, run npm install, then the command `Grunt jasmine`
