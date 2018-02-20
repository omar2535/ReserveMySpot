/*jshint esversion: 6 */

//Make connection
var socket = io.connect('http://localhost:3000/');

//Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var button = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//emit even for broadcasting message when submitted form
button.addEventListener('click', ()=>{
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
    });
    message.value = "";
});

//Emit button event when enter is pressed
message.addEventListener('keyup', (event)=>{
    event.preventDefault();
    if (event.keyCode === 13) {
        button.click();
    }
});

//emit event for keypress when typing
message.addEventListener('keypress', ()=>{
    socket.emit('typing', {
        user: handle.value,
    });
    
});


//listen for events
socket.on('chat', (data)=>{
    feedback.innerHTML = "";    
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', (data)=>{
    feedback.innerHTML = '<p><em>' + data.user + ' is typing a message </em></p>';
});


//To check if user is typing anymore
window.setInterval(function(){
    feedback.innerHTML = "";
  }, 5000);

