const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// serving static files
app.use(express.static('public'))


// set the view engine to ejs
app.set('view engine', 'ejs');


// index page
app.get('/ejs', function(req, res) {
  var mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];
  var tagline = "No programming concept is complete without a cute animal mascot.";

  res.render('pages/index', {
    mascots: mascots,
    tagline: tagline
  });

  // res.render('pages/index');
});

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
