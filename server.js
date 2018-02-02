/*jshint esversion: 6 */

const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.set('view enginer', 'hbs');

hbs.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

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
        active: "home",
    });
});

//Getting MyAccountPage
app.get('/MyAccount', (req, res)=>{
    res.render('myAccount.hbs', {
        pageTitle: "MyAccount",
        getCurrentYear: year=new Date().getFullYear(),
        active: "myAccount",
    });
});

app.get('/help', (req, res)=>{
    res.render('help.hbs', {
        pageTitle: "Help",
        getCurrentYear: year=new Date().getFullYear(),
        active: "help",
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: "About",
        getCurrentYear: year=new Date().getFullYear(),
        active: "about",
    });
});