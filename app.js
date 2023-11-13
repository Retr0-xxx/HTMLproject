const express = require('express');
const path = require('path');

//create express app and http server
const app = express();
const http = require('http').Server(app);

//create a port
const port = process.env.PORT || 3000;

//attach http server to socket.io
const io = require('socket.io')(http);

//create a new connection
io.on('connection', (socket) => {});

//serve static files from public directory
app.use(express.static(path.join(__dirname , 'public')));

//handle request and response, send index.html in public folder back to client
app.get('/', (req, res) => {
    res.sendFile(__dirname , '/public','/index.html');
    }
    );

app.listen(3000, () => console.log('Server listening on port 3000'));

