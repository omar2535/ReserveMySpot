/*jshint esversion: 6 */

//INITIALIZE DEPENDENCIES
const express = require('express');        //Express.js
const app = express();                     //Express.js app
const MongoClient = require('mongodb').MongoClient;    //MongoDB client
const bodyParser = require('body-parser');             //To parse URL information
const path = require('path');                          //Path - inside NODE
const hbs = require('hbs');                            //Handlebars 
const passport = require('passport');                  //passportjs
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;  //passportjs Google strategy

require('./routes')(app);                             //Initialize the routes this app will do
require('./oauthroutes')(app, passport, GoogleStrategy);

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//Setting the pathnames and middleware
hbs.registerPartials(__dirname + '/views/partials');
app.set('view enginer', 'hbs');

hbs.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

//Port number and start listening on PORT
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log("app listening on port: "+ PORT);
});

//To use CSS files:
app.use(express.static(path.join(__dirname + '/public')));

