const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// serving static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
  // res.sendFile(__dirname + '/templates/index.html');
});
app.get('/hello', (req, res) => {
  res.send('Hello World!')
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
