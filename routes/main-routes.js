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
    Reservation.find({
        googleId: null,
        name: "empty",
    }).then((reservations)=>{
        res.render('home.hbs', {
            pageTitle: "Home",
            getCurrentYear: year,
            active: "home",
            User: req.user,
            status: req.query.status,
            Reservations: reservations,
        });
    });
});

//get data from added reservation
mainRouter.post('/', urlEncodedParser, (req, res)=>{
    Reservation.findOneAndUpdate({
       _id: req.body.selection
    }, {
        googleId: req.user.googleId,
        name : req.user.firstName,
    }, ()=>{
        var status = encodeURIComponent("success");
        res.redirect("/?status=" + status);
    });
    
});

//Getting MyAccountPage
mainRouter.get('/MyAccount', (req, res) => {
    if (req.user) {
        //Once in account, user object for data remains
        data.User = req.user;
        //Find reservation
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
    
    renderIfUser(req, res, 'help.hbs', data);


});

//Getting about page
mainRouter.get('/about', (req, res) => {

    data.pageTitle = "About";
    data.active = "about";

    renderIfUser(req, res, 'about.hbs', data);

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