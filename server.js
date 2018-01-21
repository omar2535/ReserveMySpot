/*jshint esversion: 6 */

const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.set('view enginer', 'hbs');

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log("app listening on port: "+ PORT);
});

//To use CSS files:
app.use(express.static(path.join(__dirname + '/public')));

//Getting homepage and returning
app.get('/', (req, res)=>{
    res.render('home.hbs',{
        pageTitle: "Home",
        getCurrentYear: year=new Date().getFullYear(),
    });
});