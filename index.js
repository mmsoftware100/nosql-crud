const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('crud');
    const tasks = database.collection('task');

    // Query for a movie that has the title 'Back to the Future'
    const query = { name: 'Wake up at 5 AM' };
    const search_tasks = await tasks.find({name:"ha"}); //  findOne(query);
    const allValues = await search_tasks.toArray();
    console.log(allValues);
    /*
    while (await search_tasks.hasNext()) {
        console.log(await search_tasks.next());
    }
    */

    // console.log(search_tasks);
    let today = new Date().toLocaleDateString()
    let result =  await tasks.insertOne({ name: 'Hello '+ today });
    console.log(result);


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);