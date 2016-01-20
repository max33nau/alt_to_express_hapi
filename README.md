# alt_to_express_hapi

Title: Alternative to Express Using Hapi

Author: Max Jacobsen

Purpose: To see how another middleware/server framework works in comparison to using
express.

To run test on this app make sure that you have the required dependencies in your package.json folder as well as have a open mongod running. I use mongod --dbpath data/db to run my mongo database. Then go into the alt_to_express_hapi directory and type npm test.
This should take you through the tests to make sure the app runs CRUD properly.

To run the app just normally cd into the lib folder and type node app.js, assuming you have node globally installed.

Summary:

Server difference:
  Hapi's server doesn't start right away once you create a server. Express you simply have to "var express = require('express'); var app = expres()" (copied from my previous assignment, this has a http.createServer() under the hood going on inside express) Then put a app.listen(specified port) to start your server. But hapi you have to create your server separately and then do a server.start() call to begin your server, you don't assign it to a app. You can also specify the conditions of your server by adding several conditions to the server object. The main difference hear between Hapi and express is that express uses http.createServer() to run its server and simply has a wrapper around it, but hapi has its own logic when creating a server.

Routes difference:
  Using express you simply just have to add a .VERB(path, function(request,response){}) where VERB can be get, post, put or delete. To return data back to the page you use response.send(). For hapi you have to create a entire server.route([]) which holds all your methods, paths, handlers in objects within the array. Instead of getting request and response, the handler gives back a request and reply. A example of a object within the server.route array would be. {method: "GET", path: "/", handler: function(request,reply){ reply('hello')}}. You can also add configurations to your handler to make sure your getting required data.

POST Data difference:
  I noticed about hapi that was different from express was you don't need to use a body-parser or convert the data when doing a POST method. Hapi just did it for me and converted my POST data to a JSON object.  

Things I liked More about Express:
  Easy to have a whole page devoted to all your VERBS for one specific path. Did not have to manipulate the http server at all, simply created it for me quickly. Did not have to reuse a lot of code.

Things I didn't like about Express:
  If something goes wrong, you have to make sure you have a error call because express doesn't break if you have a error. Hapi on the other hand will send you back a 404 error and will break telling you with better detail of what the error was.

Things I liked about Hapi:
  I could read what I was doing a lot easier than express. I feel like the code was easier to follow and what was going on. I also liked that you didn't have to parse the POST data like express. It was also very easy to control and configure certain data in the way I wanted it too.

Things I didn't like about Hapi:
  It got cluttered really quickly, I am sure there are ways around this. But with express          you can add a whole javascript file for one specific path, this is a little more difficult with hapi. It also was hard to wrap my head around how the reply() worked where getting the response data from express was more straightforward.

I really enjoyed incorporating mongodb with this project. I think I learned a lot. 
