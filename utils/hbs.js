/*jshint esversion: 6 */

/*
This file is for registering handlebars helper functions
Current implementation function: 
ifCond: {#ifCond omar 19}{/ifCond}

*/
const hbs = require('hbs');

//Register if condition for handebars 
hbs.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

module.exports = hbs;