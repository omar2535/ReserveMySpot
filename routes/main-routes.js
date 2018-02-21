/*jshint esversion: 6 */

/*
This file is for pure routes for the website.
Redirects to 4 main pages: Home, MyAccount, Help, and About
*/

const bodyParser = require('body-parser'); //To parse URL information
const urlEncodedParser = bodyParser.urlencoded({
    extended: false
});
const Reservation = require('../models/reservation-models');
const mainRouter = require('express').Router();


//variable for date
var year = new Date().getFullYear();

//declaration for data object
var data = {
    pageTitle: String,
    getCurrentYear: year, 
    active: String,
    User: Object,
    status: String,
};

//Getting homepage and returning
mainRouter.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: "Home",
        getCurrentYear: year,
        active: "home",
        User: req.user,
        status: req.query.status,
    });
});

//Getting MyAccountPage
mainRouter.get('/MyAccount', (req, res) => {
    if (req.user) {
        Reservation.find({
            googleId: req.user.googleId,
        }).then((reservations) => {
            res.render('myAccount.hbs', {
                pageTitle: "MyAccount",
                getCurrentYear: year,
                active: "myAccount",
                User: req.user,
                Reservations: reservations,
            });
        });

    } else {
        var status = encodeURIComponent('unregistered');
        res.redirect('/?status=' + status);
    }
});

//Getting help page
mainRouter.get('/help', (req, res) => {

    data.pageTitle = "Help";
    data.active = "help";
    data.User = req.user;
    renderIfUser(req, res, 'help.hbs', data);


});

//Getting about page
mainRouter.get('/about', (req, res) => {

    data.pageTitle = "About";
    data.active = "about";
    data.User = req.user;
    renderIfUser(req, res, 'about.hbs', data);

});

//When posting about reservation data
mainRouter.post('/', urlEncodedParser, (req, res) => {
    Reservation.findOne({
        date: req.body.date_field,
        time: req.body.time_field,
        location: req.body.location_field,
    }).then((currenReservation) => {
        if (currenReservation) {
            console.log("already exists",
                currenReservation.date, currenReservation.time, currenReservation.location);
            var status = encodeURIComponent('failed');
            res.redirect('/?status=' + status);
        } else {
            //To store date as year-month-day format
            var str = req.body.date_field.toString();
            var arr = [];
            arr = str.split('-');
            new Reservation({
                googleId: req.user.googleId,
                name: req.user.firstName,
                year: arr[0],
                month: arr[1],
                date: arr[2],
                location: req.body.location_field,
                time: req.body.time_field,
            }).save().then((newReservation) => {
                console.log("created new reservation: ", newReservation);
                var status = encodeURIComponent('success');
                res.redirect('/?status=' + status);
            });
        }
    });

});


module.exports = mainRouter;

//renders the page if user is logged in
//requires request, response, handlebars page, and data object
var renderIfUser = function (req, res, pageToRender, data) {
    if (req.user) {
        res.render(pageToRender, data);
    } else {
        var status = encodeURIComponent('unregistered');
        res.redirect('/?status=' + status);
    }
};