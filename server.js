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
const keys = require('./config/keys');
const session = require('express-session');
const mongoose = require('mongoose');

//Initialize the routes this app will do
require('./routes')(app);                             
const authRoutes = require('./routes/oauthroutes'); 

//Initialize handlebars 
app.set('view enginer', 'hbs');

//To use CSS files:
app.use(express.static(path.join(__dirname + '/public')));

//Initialize session cookies 
app.use(session({
  secret: keys.session.cookieKey,
  resave :false,
  saveUninitialized: true,
}));


//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//Initialize Mongoose to connect to DB using URI in keys
mongoose.connect(keys.mongodb.dbURI, ()=>{
    console.log('connected to monbodb');
});

//Setting the pathnames and middleware
hbs.registerPartials(__dirname + '/views/partials');

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



