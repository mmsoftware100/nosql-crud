const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const { MongoClient , ObjectId, ServerApiVersion} = require("mongodb");

var port = process.env.PORT || 5508;
// Replace the uri string with your connection string.
// const uri = "mongodb://localhost:27017";
// const uri = "mongodb+srv://Cluster90592:Sa3pczFDUgEVzEOA@cluster90592.y6zvyrl.mongodb.net/";
const uri = "mongodb+srv://Cluster90592:Sa3pczFDUgEVzEOA@cluster90592.y6zvyrl.mongodb.net/?retryWrites=true&w=majority";

// const mongoClient = new MongoClient(uri);
const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// var ObjectId = require('mongodb').ObjectID;


const io = new Server(server);
// serving static files
app.use(express.static('public'))
// body parser
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data in request body
app.use(express.json());

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
  task_list = selectTasks().then((task_list) => {
    const context = {
      task_list: task_list
    };
    // render template using context
    res.render('pages/task_list', context);
  }).catch((err) => {
    console.log(err);
    res.send("Something went wrong ");
  });
  // prepare context to pass template engine
  
});

app.get('/new-task-form', function(req, res) {
  res.render('pages/new_task_form');
});
app.post('/submit-task', (req, res) => {
  const name = req.body.name;
  // const email = req.body.email;
  console.log(req.body);
  // insert here

  // Do something with the submitted data (e.g., store it in a database).
  // redirect to listing page
  insertTask(req.body).then(()=>{
    // res.send(`Name: ${name}`);
    res.redirect('/tasks');
  }).catch((err)=>{
    console.log(err);
    res.send("Something went wrong ");
  });
  
});
app.post('/delete-task', (req, res) => {
  const id = req.body.id;
  deleteTask(id).then(()=>{
    // res.send(`Name: ${name}`);
    res.redirect('/tasks');
  }).catch((err)=>{
    console.log(err);
    res.send("Something went wrong ");
  });
  
});
// Define a route handler for PUT requests
app.put('/api/v1/tasks/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedData = req.body;
  // Your logic to update the item with the provided ID using updatedData
  // For demonstration purposes, we'll simply send a response
  console.log("item id " + itemId);
  console.log(updatedData);

  updateTask(itemId, updatedData)
  .then(()=>{
    res.json({ status: true, message: `Updated item with ID ${itemId}`, data : updatedData });
  })
  .catch((err) => {
    res.json({ status: false, message: err, updatedData });
  });
  
});


io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(port, () => {
  console.log('listening on *:'+port);
});


// db operation
async function insertTask(obj) {
  try {
    const database = mongoClient.db('crud');
    const tasks = database.collection('task');
    let today = new Date().toLocaleDateString()
    let result =  await tasks.insertOne({ ...obj, status : false });
    console.log(result);
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
async function selectTasks() {
  try {
    const database = mongoClient.db('crud');
    const tasks = database.collection('task');
    // Query for a movie that has the title 'Back to the Future'
    const query = { name: 'Wake up at 5 AM' };
    const search_tasks = await tasks.find({}).sort({ _id: -1 }); //  findOne(query);
    const allValues = await search_tasks.toArray();
    console.dir(allValues);
    return allValues;
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
async function updateTask(id,obj) {
  try {
    console.log("updateTask ");
    const database = mongoClient.db('crud');
    const tasks = database.collection('task');
    // Filter by _id
    const filter = { _id: new ObjectId(id) };
    // Set the new data
    const updateDoc = {
      $set: obj,
    };
    // Update the document
    const result = await tasks.updateOne(filter, updateDoc);


    // Check the result
    if (result.modifiedCount === 1) {
      console.log('Document updated successfully');
    } else {
      console.log('Document not found or no changes made');
    }
  }
  catch(err){
    console.log("updateTask->catch err");
    console.log(err);
  }
  finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
    console.log("updateTask->finally");
  }
}

async function deleteTask(id) {
  try {
    const database = mongoClient.db('crud');
    const tasks = database.collection('task');

    const filter = { _id: new ObjectId(id) };

    // Delete the document
    const result = await tasks.deleteOne(filter);

    // Check the result
    if (result.deletedCount === 1) {
      console.log('Document deleted successfully');
    } else {
      console.log('Document not found or no documents deleted');
    }
  } catch(err) {
    console.log(err);
    // Ensures that the client will close when you finish/error
    // await client.close();
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}