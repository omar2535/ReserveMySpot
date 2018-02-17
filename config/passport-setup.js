/*jshint esversion: 6 */

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-models');

//saves user to session - authentication is only done once on login
//after that, the user information is stored as a cookie in the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//attaches user object to request
//will take the session's user object and attach to request 
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

//allow passport to use google strategy
passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        // check if user already exists in our own db
        User.findOne({
            googleId: profile.id
        }).then((currentUser) => {
            if (currentUser) {
                // already have this user
                console.log('User exists: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.image.url,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                }).save().then((newUser) => {
                    console.log('Created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);