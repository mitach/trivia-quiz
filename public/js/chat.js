// chat.js
export function sendMessage(socket, roomName, message) {
    socket.emit('message', { room: roomName, message });
    document.getElementById('message').value = '';
}

export function displayMessage(message) {
    const messages = document.getElementById('messages');
    messages.innerHTML += `<p>${message}</p>`;
}