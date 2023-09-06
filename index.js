const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// serving static files
app.use(express.static('public'))
// body parser
app.use(express.urlencoded({ extended: true }));


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

/* tasks */
app.get('/tasks', function(req, res) {
  // getting data
  var task_list = [
    { _id: "thisIsId", name: 'Sammy', status: false },
    { _id: "thisIsId2", name: 'Monday', status: true },
    { _id: "thisIsId3", name: 'Friday', status: false }
  ];
  // prepare context to pass template engine
  const context = {
    task_list: task_list
  };
  // render template using context
  res.render('pages/task_list', context);
});

app.get('/new-task-form', function(req, res) {
  res.render('pages/new_task_form');
});
app.post('/submit-task', (req, res) => {
  const name = req.body.name;
  // const email = req.body.email;
  console.log(req.body);

  // Do something with the submitted data (e.g., store it in a database).

  res.send(`Name: ${name}`);
});


io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
