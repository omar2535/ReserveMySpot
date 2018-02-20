/*jshint esversion: 6 */

//Module for socket.io
const socket = require('socket.io');


module.exports = function(server){
        //Socket setup
    var io = socket(server);
    io.on('connection',(socket)=>{
        console.log('made socket connection');

        socket.on('chat', (data)=>{
            console.log('recieved chat data');
            io.emit('chat', data);
        });

        socket.on('typing', (data)=>{
            console.log('someone is typing');
            socket.broadcast.emit('typing', data);
        });

    });
};