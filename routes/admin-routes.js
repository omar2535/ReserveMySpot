/*jshint esversion: 6 */

/*
This file is for admin routes
*/
const adminRouter = require('express').Router();
const bodyParser = require('body-parser'); //To parse URL information
const urlEncodedParser = bodyParser.urlencoded({extended: false});
const Reservation = require('../models/reservation-models');
const adminUtils = require('../utils/admin-utils');

//Route for homepage on adminpage
adminRouter.get('/', (req, res)=>{
    adminUtils.renderIfAdmin(req, res, 'admin-panel.hbs');
});

//Route to get form data from admin panel
adminRouter.post('/', urlEncodedParser, (req, res)=>{
    
});


//Route for settings of site-settings
adminRouter.get('/settings', (req, res)=>{

});

//Route to add new schedules available for reservation
adminRouter.get('/add', (req, res)=>{

});


module.exports = adminRouter;

