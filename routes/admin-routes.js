/*jshint esversion: 6 */

/*
This file is for admin routes
*/
const adminRouter = require('express').Router();
const bodyParser = require('body-parser'); //To parse URL information
const urlEncodedParser = bodyParser.urlencoded({extended: false});
const Reservation = require('../models/reservation-models');
const adminUtils = require('../utils/admin-utils');
const url = require('url');    

//variable for date
var year = new Date().getFullYear();

//Route for homepage on adminpage
adminRouter.get('/', (req, res)=>{
    Reservation.find({

    }).then((reservations) => {
    
        adminUtils.renderIfAdmin(req, res, 'admin-panel.hbs', {
            getCurrentYear: year,
            Reservations: reservations,
        });    
        
    });


});

//Route to get form data from admin panel
adminRouter.post('/', urlEncodedParser, (req, res)=>{
    Reservation.findOne({
        date: req.body.date_field,
        time: req.body.time_field,
        location: req.body.location_field,
    }).then((currenReservation) => {
        if (currenReservation) {
            console.log("already exists",
                currenReservation.date, currenReservation.time, currenReservation.location);
            var status = encodeURIComponent('failed');
            res.redirect(url.format({
                pathname: "/admin/",
                query: {
                    "status": status,   
                }
            }));
        } else {
            //To store date as year-month-day format
            var str = req.body.date_field.toString();
            var arr = [];
            arr = str.split('-');
            new Reservation({
                googleId: null,
                name: "empty",
                year: arr[0],
                month: arr[1],
                date: arr[2],
                location: req.body.location_field,
                time: req.body.time_field,
            }).save().then((newReservation) => {
                console.log("created new reservation: ", newReservation);
                res.redirect(url.format({
                    pathname: "/admin/",
                    query: {
                        "status": 'success',   
                    }
                }));
            });
        }
    });
});


//Route for settings of site-settings
adminRouter.get('/settings', (req, res)=>{

});

//Route to add new schedules available for reservation
adminRouter.get('/add', (req, res)=>{

});


module.exports = adminRouter;

