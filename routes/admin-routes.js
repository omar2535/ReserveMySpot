/*jshint esversion: 6 */

/*
This file is for admin routes
*/
const adminRouter = require("express").Router();
const bodyParser = require("body-parser"); //To parse URL information
const urlEncodedParser = bodyParser.urlencoded({
  extended: false
});
const Reservation = require("../models/reservation-models");
const adminUtils = require("../utils/admin-utils");
const url = require("url");

//variable for date
var year = new Date().getFullYear();

//Route for homepage on admin page
adminRouter.get("/", (req, res) => {
  Reservation.find().then(reservations => {
    adminUtils.renderIfAdmin(req, res, "admin-panel.hbs", {
      getCurrentYear: year,
      Reservations: reservations,
      status: req.query.status
    });
  });
});

//Route to get form data from admin panel
adminRouter.post("/", urlEncodedParser, (req, res) => {
  //If it was a creation submission
  if(req.body.date_field && req.body.time_field && req.body.location_field){
    Reservation.findOne({
      date: req.body.date_field,
      time: req.body.time_field,
      location: req.body.location_field
    }).then(currentReservation => {
      if (currentReservation) {
        console.log(
          "already exists",
          currentReservation.date,
          currentReservation.time,
          currentReservation.location
        );
        var status = encodeURIComponent("failed");
        res.redirect("/admin/?status=" + status);
      } else {
        //To store date as year-month-day format
        var str = req.body.date_field.toString();
        var arr = [];
        arr = str.split("-");
        new Reservation({
          googleId: null,
          name: "empty",
          year: arr[0],
          month: arr[1],
          date: arr[2],
          location: req.body.location_field,
          time: req.body.time_field,
          reservationId: '_' + Math.random().toString(36).substr(2, 9),
        })
          .save()
          .then(newReservation => {
            console.log("created new reservation: ", newReservation);
            var status = encodeURIComponent("success");
            res.redirect("/admin/?status=" + status);
          });
      }
    });
  }
  //If it was a delete submission
  if(req.body.delete){
    Reservation.findOneAndRemove({
      _id: req.body.delete,
    }, ()=>{
      var status = encodeURIComponent("success");
      res.redirect("/admin/?status=" + status);
    });
  }
});


//Route for settings of site-settings
adminRouter.get("/settings", (req, res) => {  
  
});

//Route to add new schedules available for reservation
adminRouter.get("/add", (req, res) => {});

module.exports = adminRouter;
