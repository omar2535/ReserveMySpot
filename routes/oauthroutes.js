const router = require('express').Router();
const passport = require('passport');


//oauth login
router.get('/login', (req, res)=>{
    res.render('login', {
        user: req.user,
        active: "login",
        getCurrentYear: year=new Date().getFullYear(),
        pageTitle: "login",
    });
});

//auth logout
router.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
});

//auth with google 
router.get('/google', passport.authenticate("google", {
    scope: ['profile']
}));
//callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res)=>{
    //res.send('successfully logged in as '+ req.user);
    res.redirect('/myAccount');
});

module.exports = router;