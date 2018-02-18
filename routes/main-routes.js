/*jshint esversion: 6 */

/*
This file is for pure routes for the website.
Redirects to 4 main pages: Home, MyAccount, Help, and About
*/

const bodyParser = require('body-parser'); //To parse URL information
const urlEncodedParser = bodyParser.urlencoded({extended: false});
const Reservation = require('../models/reservation-models');

module.exports = function (app) {

    //Getting homepage and returning
    app.get('/', (req, res) => {
        res.render('home.hbs', {
            pageTitle: "Home",
            getCurrentYear: year = new Date().getFullYear(),
            active: "home",
            User: req.user,
            status: req.query.status,
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

    //When posting about reservation data
    app.post('/', urlEncodedParser, (req, res)=>{

        new Reservation({
            googleId: req.user.googleId,
            date: req.body.date_field,
            location: req.body.location_field,
        }).save().then((newReservation)=>{
            console.log("created new reservation: ", newReservation);
            var status = encodeURIComponent('success');
            res.redirect('/?status=' + status);
        });
        
    });
};