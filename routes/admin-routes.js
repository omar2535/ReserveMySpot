/*jshint esversion: 6 */

/*
This file is for admin routes
*/
const router = require('express').Router();
const bodyParser = require('body-parser'); //To parse URL information
const urlEncodedParser = bodyParser.urlencoded({extended: false});
const Reservation = require('../models/reservation-models');


router.get('/', (req, res)=>{
    if(req.user){
        if(req.user.isAdmin == true){
            res.send("<h1>You are authorized</h1>");
        }else{
            res.send("<h1>Your account does not have admin rights");
        }
    }else{
        res.send("<h1>You are NOT authorized</h1>");
    }
});

module.exports = router;