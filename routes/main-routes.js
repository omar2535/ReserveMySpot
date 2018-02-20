/*jshint esversion: 6 */

/*
This file is for pure routes for the website.
Redirects to 4 main pages: Home, MyAccount, Help, and About
*/

const bodyParser = require('body-parser'); //To parse URL information
const urlEncodedParser = bodyParser.urlencoded({extended: false});
const Reservation = require('../models/reservation-models');


module.exports = function (app) {
    //variable for date
    var year = new Date().getFullYear();

    //Getting homepage and returning
    app.get('/', (req, res) => {
        res.render('home.hbs', {
            pageTitle: "Home",
            getCurrentYear: year,
            active: "home",
            User: req.user,
            status: req.query.status,
        });
    });

    //Getting MyAccountPage
    app.get('/MyAccount', (req, res) => {
        if(req.user){

            Reservation.find({
                googleId: req.user.googleId,
            }).then((reservations)=>{
                res.render('myAccount.hbs', {
                    pageTitle: "MyAccount",
                    getCurrentYear: year,
                    active: "myAccount",
                    User: req.user,
                    Reservations: reservations,
                });
            });

        }else{
            var status = encodeURIComponent('unregistered');
            res.redirect('/?status='+ status);
        }
    });

    //Getting help page
    app.get('/help', (req, res) => {
        if(req.user){
            res.render('help.hbs', {
                pageTitle: "Help",
                getCurrentYear: year,
                active: "help",
                User: req.user,
            });
        }else{
            var status = encodeURIComponent('unregistered');
            res.redirect('/?status='+ status);
        }
    });

    //Getting about page
    app.get('/about', (req, res) => {
        if(req.user){
            res.render('about.hbs', {
                pageTitle: "About",
                getCurrentYear: year,
                active: "about",
                User: req.user,
            });
        }else{
            var status = encodeURIComponent('unregistered');
            res.redirect('/?status='+ status);
        }
    });

    //When posting about reservation data
    app.post('/', urlEncodedParser, (req, res)=>{
        Reservation.findOne({
            date: req.body.date_field,
            time: req.body.time_field,
            location: req.body.location_field,
        }).then((currenReservation)=>{
            if(currenReservation){
                console.log("already exists", 
                currenReservation.date, currenReservation.time, currenReservation.location);
                var status = encodeURIComponent('failed');
                res.redirect('/?status=' + status);
            }else{
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
                }).save().then((newReservation)=>{
                    console.log("created new reservation: ", newReservation);
                    var status = encodeURIComponent('success');
                    res.redirect('/?status=' + status);
                });
            }
        });

    });

};