import * as chat from './js/chat.js';

const socket = io();

// Join a room
document.getElementById('join-room').addEventListener('click', () => {
    const room = document.getElementById('room').value;
    const username = document.getElementById('username').value;
    
    socket.emit('join', {room, username});
});

// Send a chat message
document.getElementById('send').addEventListener('click', () => {
    const message = document.getElementById('message').value;
    const room = document.getElementById('room').value;

    chat.sendMessage(socket, room, message);

    // socket.emit('message', { room, message });
    // document.getElementById('message').value = '';
});

// Receive and display messages
socket.on('message', (data) => {
    console.log(data)
    data.systemMessage 
        ? printSystemMessage(data)
        : printUserMessage(data)
});

function printSystemMessage(data) {
    const messages = document.getElementById('messages');
    messages.innerHTML += `<p>${data.message}</p>`;
}

function printUserMessage(data) {
    const messages = document.getElementById('messages');
    messages.innerHTML += `<p>${data.message}</p>`;
}