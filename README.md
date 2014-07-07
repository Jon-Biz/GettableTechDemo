
# Roast or Rant? 
*A tech demo for Gettable.com*

## Try it out

**Hosted here:** http://slobotnik.no-ip.info:3000

## Client

On load, the client checks for the cookie `uuid`. If it doesn't find one, it generates a unique id for the client and sets the cookie. Then it uses the uuid to retrieve the data payload. So, if you want access the app as a different user, use a different browser or device, or delete the cookie.

While the instructions were not to bother 'designing' the app, I wanted the opportunity to demonstrate integration of DOM manipulation with marionette's view system. So, I included a couple of simple animations triggered within Marionnette's onRender and onShow methods.

I built this on top of https://github.com/BoilerplateMVC/Marionette-Require-Boilerplate . There's still some leftover files and other stuff that make may the code less than navigable/readable, that I did not have time to weed out.

## Database API

Database access is via a single Get and Set. Get retrieves the restaurant data, Set updates a single rating. 

###GET `\data\uuid`

The Get data retrieves all the restaurants and users from their collections. Then it retreives the User using the `uuid` and the User collection. If the use does not exist, they are created.

Iterating through the Restaurants, it tallies and average their ratings across the Users, and sets this on each restaurant object. Then it returns this as json to the client.

###SET `\data\uuid\rating`

This sets a rating for the user. The body from the client is the restaurant model including the user's rating. 

If it finds the user in the User database, it retrieves the rating and update it. Otherwise it sets it.
 
The client considers a rating of zero to be a delete and consequently the server deletes the record, so that it count toward the average score.

The User's data is then updated on the server. Then, the getdata function is triggered, returning the new, updated data, including the user's recent rating change. 

## Schema

If it is not obvious from the API, there are two schemas on the mongodb database: the restaurant one, which holds static restaurant data, and the Users, which holds an array containing a key/value pairs for each restaurant the user has reveiwed.

##Tests

I worked quickly, and did not use unit testing for most of it I did not test most of this. However, since I wanted to show you exampes of tests, I built a couple of models in a test driven style. Here jasmine tests of the data joining and database access modules, injecting promises and making use of callback interceptors:

https://github.com/Jon-Biz/GettableTechDemo/tree/master/database/tests

To run them, clone the project, run npm install, then the command `Grunt jasmine`
