const { MongoClient , ObjectId} = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);
// var ObjectId = require('mongodb').ObjectID;

async function select2() {
  try {
    const database = client.db('crud');
    const tasks = database.collection('task');

    // Query for a movie that has the title 'Back to the Future'
    const query = { name: 'Wake up at 5 AM' };
    const search_tasks = await tasks.find({}); //  findOne(query);
    const allValues = await search_tasks.toArray();
    console.dir(allValues);
    /*
    while (await search_tasks.hasNext()) {
        console.log(await search_tasks.next());
    }
    */

    // console.log(search_tasks);
    let today = new Date().toLocaleDateString()
    let result =  await tasks.insertOne({ name: 'Hello '+ today, status : false });
    console.log(result);


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}


async function insert() {
  try {
    const database = client.db('crud');
    const tasks = database.collection('task');
    let today = new Date().toLocaleDateString()
    let result =  await tasks.insertOne({ name: 'Hello '+ today, status : false });
    console.log(result);
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
async function select() {
  try {
    const database = client.db('crud');
    const tasks = database.collection('task');
    // Query for a movie that has the title 'Back to the Future'
    const query = { name: 'Wake up at 5 AM' };
    const search_tasks = await tasks.find({}); //  findOne(query);
    const allValues = await search_tasks.toArray();
    console.dir(allValues);
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
async function update() {
  try {
    const database = client.db('crud');
    const tasks = database.collection('task');

    await tasks.updateOne(
      { _id: new ObjectId("64f69dbd139696994ad9e5f0") },
      {
        $set: { status : false, name : "wake me up when september end" },
        $currentDate: { lastModified: true }
      }
    );

    // Filter by _id
    const filter = { _id: new ObjectId("64f69dbd139696994ad9e5f0") };
    const newData = {
      name: 'this is name',
      status: true,
      // Add other fields you want to update
    };
    
    // Set the new data
    const updateDoc = {
      $set: newData,
    };

    // Update the document
    const result = await tasks.updateOne(filter, updateDoc);

    // Check the result
    if (result.modifiedCount === 1) {
      console.log('Document updated successfully');
    } else {
      console.log('Document not found or no changes made');
    }
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
async function remove_doc() {
  try {
    const database = client.db('crud');
    const tasks = database.collection('task');

    const filter = { _id: new ObjectId("64f69dbd139696994ad9e5f0") };

    // Delete the document
    const result = await tasks.deleteOne(filter);

    // Check the result
    if (result.deletedCount === 1) {
      console.log('Document deleted successfully');
    } else {
      console.log('Document not found or no documents deleted');
    }
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}


// console.log("-------");
// insert().catch(console.dir);
// console.log("-------");
// select().catch(console.dir);
// console.log("-------");
update().catch(console.dir);
//remove_doc().catch(console.dir);