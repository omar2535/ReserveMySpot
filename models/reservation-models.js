/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Model for reservation Object
const reservationSchema = new Schema({
    googleId: String,
    name: String,
    year: String,
    month: String,
    date: String,
    time: String,
    location: String,
});

const Reservation = mongoose.model('reservation', reservationSchema);

module.exports = Reservation;