/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Model for User Object
const userSchema = new Schema({
    username: String,
    googleId: String,
    thumbnail: String,
    firstName: String,
    lastName: String,
    isAdmin: {type: Boolean, default: false}
});
const User = mongoose.model('user', userSchema);

module.exports = User;