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
    let message = document.getElementById('message').value;
    const room = document.getElementById('room').value;
    const username = document.getElementById('username').value;

    message = message.trim()

    if (!message) {
        return;
    }

    const data = {
        message,
        room,
        username
    }
    chat.sendMessage(socket, data);

    // socket.emit('message', { room, message });
    // document.getElementById('message').value = '';
});

// Receive and display messages
socket.on('message', (data) => {
    console.log(data)
    data.systemMessage 
        ? chat.displaySystemMessage(data)
        : chat.displayUserMessage(data)
});