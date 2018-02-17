/*jshint esversion: 6 */

/*
 
This file is for pure routes for the website.
Redirects to 4 main pages: Home, MyAccount, Help, and About

*/


module.exports = function (app) {

    //Getting homepage and returning
    app.get('/', (req, res) => {
        res.render('home.hbs', {
            pageTitle: "Home",
            getCurrentYear: year = new Date().getFullYear(),
            active: "home",
            User: req.user,
        });
    });

    //Getting MyAccountPage
    app.get('/MyAccount', (req, res) => {
        res.render('myAccount.hbs', {
            pageTitle: "MyAccount",
            getCurrentYear: year = new Date().getFullYear(),
            active: "myAccount",
            User: req.user,

        });
    });

    //Getting help page
    app.get('/help', (req, res) => {
        res.render('help.hbs', {
            pageTitle: "Help",
            getCurrentYear: year = new Date().getFullYear(),
            active: "help",
            User: req.user,
        });
    });

    //Getting about page
    app.get('/about', (req, res) => {
        res.render('about.hbs', {
            pageTitle: "About",
            getCurrentYear: year = new Date().getFullYear(),
            active: "about",
            User: req.user,
        });
    });
};