const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle room joining
    socket.on('join', ({ room, username }) => {
        console.log(`User joined room: ${room}`);
        socket.join(room);

        const newDate = new Date();
        const hours = newDate.getHours();
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const minutes = newDate.getMinutes();
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const date = `${formattedHours}:${formattedMinutes}`;

        const message = `joined room: ${room}`;
        
        const data = {
            username,
            message,
            systemMessage: true,
        }
        
        io.to(room).emit('message', data)
    });

    // Handle chat messages
    socket.on('message', (data) => {
        console.log('FLAG')
        console.log(data)
        io.to(data.room).emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('Server is running on http://localhost:3000');
});