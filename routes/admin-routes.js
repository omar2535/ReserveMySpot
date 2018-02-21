/*jshint esversion: 6 */

/*
This file is for admin routes
*/
const adminRouter = require('express').Router();
const bodyParser = require('body-parser'); //To parse URL information
const urlEncodedParser = bodyParser.urlencoded({extended: false});
const Reservation = require('../models/reservation-models');

//Route for homepage on adminpage
adminRouter.get('/', (req, res)=>{
    if(req.user && req.user.isAdmin == true){           
        res.render('admin-panel.hbs');
            
        
    }else{
        res.send("<h1>You are NOT authorized</h1>");
    }
});

//Route for settings of site-settings
adminRouter.get('/settings', (req, res)=>{
    if(req.user && req.user.isAdmin == true){           
        //Do admin stuff here
        
        
    }else{
        res.send("<h1>You are NOT authorized</h1>");
    }
});

//Route to add new schedules available for reservation
adminRouter.get('/add', (req, res)=>{
    if(req.user && req.user.isAdmin == true){           
        //Do admin stuff here

        
    }else{
        res.send("<h1>You are NOT authorized</h1>");
    }
});


module.exports = adminRouter;