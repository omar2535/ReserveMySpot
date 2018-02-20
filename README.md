[![Build Status](https://travis-ci.org/omar2535/ReserveMySpot.svg?branch=master)](https://travis-ci.org/omar2535/ReserveMySpot)
![Build Status](https://img.shields.io/npm/v/npm.svg)
[![dependencies Status](https://david-dm.org/expressjs/express/status.svg)](https://david-dm.org/expressjs/express)
[![Maintainability](https://api.codeclimate.com/v1/badges/4d8fb565a37adfd99f4e/maintainability)](https://codeclimate.com/github/omar2535/ReserveMySpot/maintainability)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

# ReserveMySpot

Simple reservation program that runs on NodeJS.

Here is a list of dependancies: 
* express.js
* MongoDB
* bodyParser
* handlebars
* express-session
* mongoose
* passport-google-oauth
* socket.io

To run, in command prompt, navigate to the directory and enter:

```cmd
npm install 
nodejs server.js

```
then navigate to http://localhost:3000/ in any browser

## FAQ
**It's not running and is giving me a lot of errors?**  
You are missing a file called keys.js inside the config folder. This file should follow the format of: 

```javascript
module.exports = {
    google: {
        clientID: "Your google client ID",
        clientSecret: "Your google client secret",
    },
    mongodb: {
        dbURI: "Mongodb URI"
    },
    session: {
        cookieKey: 'Any cookie key'
    }
};
```
