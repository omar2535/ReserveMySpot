//Make connectoin
var socket = io.connect('http://localhost:3000/');

//Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var button = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//Emit events

button.addEventListener('click', ()=>{
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
    });
    message.value = "";
});

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

