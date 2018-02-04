
module.exports = function(app, passport, GoogleStrategy){

    // var GOOGLE_CONSUMER_KEY;
    // var GOOGLE_CONSUMER_SECRET;
    // passport.use(new GoogleStrategy({
    //     consumerKey: GOOGLE_CONSUMER_KEY,
    //     consumerSecret: GOOGLE_CONSUMER_SECRET,
    //     callbackURL: "http://www.example.com/auth/google/callback"
    //   },
    //   function(token, tokenSecret, profile, done) {
    //       User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //         return done(err, user);
    //       });
    //   }
    // ));

    // // GET /auth/google
    // //   Use passport.authenticate() as route middleware to authenticate the
    // //   request.  The first step in Google authentication will involve redirecting
    // //   the user to google.com.  After authorization, Google will redirect the user
    // //   back to this application at /auth/google/callback
    // app.get('/auth/google', passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));

    // // GET /auth/google/callback
    // //   Use passport.authenticate() as route middleware to authenticate the
    // //   request.  If authentication fails, the user will be redirected back to the
    // //   login page.  Otherwise, the primary route function function will be called,
    // //   which, in this example, will redirect the user to the home page.
    // app.get('/auth/google/callback', 
    // passport.authenticate('google', { failureRedirect: '/login' }),
    // function(req, res) {
    // res.redirect('/');
    // });

};