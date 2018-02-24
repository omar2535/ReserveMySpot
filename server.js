/*jshint esversion: 6 */

//INITIALIZE DEPENDENCIES
const express = require("express"); //Express.js
const app = express(); //Express.js app
const MongoClient = require("mongodb").MongoClient; //MongoDB client
const bodyParser = require("body-parser"); //To parse URL information
const path = require("path"); //Path - inside NODE
const hbs = require("./utils/hbs"); //Handlebars
const passport = require("passport"); //passportjs
const GoogleStrategy = require("passport-google-oauth").OAuthStrategy; //passportjs Google strategy
const keys = require("./config/keys");
const session = require("express-session");
const mongoose = require("mongoose");
const passportSetup = require("./config/passport-setup");

//set to use handlebars as view engine
app.set("view engine", "hbs");

//Setting the path names and middleware
hbs.registerPartials(__dirname + "/views/partials");

//To use CSS files:
app.use(express.static(path.join(__dirname + "/public")));

//Initialize session cookies
app.use(
  session({
    secret: keys.session.cookieKey,
    resave: false,
    saveUninitialized: true
  })
);

//Port number and start listening on PORT
const PORT = 3000;
var server = app.listen(PORT, () => {
  console.log("app listening on port: " + PORT);
});

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//Initialize the routes this app will do
const mainRoutes = require("./routes/main-routes");
const authRoutes = require("./routes/oauthroutes");
const adminRoutes = require("./routes/admin-routes");
const sockets = require("./utils/sockets")(server);

app.use("/", mainRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

//Initialize Mongoose to connect to DB using URI in keys
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connected to mongodb");
});
