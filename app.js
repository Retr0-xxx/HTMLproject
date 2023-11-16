const express = require('express');
const session = require('express-session');
const path = require('path');

//create express app and http server
const app = express();

const http = require('http').Server(app);

//create a port
const port = process.env.PORT || 3000;

app.use(session({
    secret: 'PASSWORD',
    resave: false,
    saveUninitialized: true
}));

//attach http server to socket.io
//const io = require('socket.io')(http);

//create a new connection
//io.on('clickPlay', (socket) => {});

//serve static files from public directory
app.use(express.static(path.join(__dirname , 'public')));

//send index.html back to client
app.get('/', (req, res) => {
    req.session.playClicked = false;
    res.sendFile(path.join(__dirname , '/private','/index.html'));
    });

//send game.html in back to client if play button was clicked
//else send back to index.html
app.get('/game.html', (req, res) => {
    if (req.session.playClicked) {
        req.session.playClicked = false;
        res.sendFile(path.join(__dirname , '/private','/game.html'));}
    else{
        res.redirect('/');
    }
    });

//set playClicked to true when play button is clicked   
app.post('/setPlay', (req, res) => {
        req.session.playClicked = true;
        res.end();
    });

app.listen(3000, () => console.log('Server listening on port 3000'));

