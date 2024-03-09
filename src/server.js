const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

app.use(express.json()); 


const mongoUri = 'mongodb://my-mongo:27017/myDatabase';
const client = new MongoClient(mongoUri);


const dbName = 'myDatabase';
const collectionName = 'myCollection';


async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
}

connectToMongo();


app.post('/api/insert', async (req, res) => {
  try {
    const data = req.body;
    const collection = client.db(dbName).collection(collectionName);
    const result = await collection.insertOne(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/records', async (req, res) => {
  try {
    const collection = client.db(dbName).collection(collectionName);
    const records = await collection.find({}).toArray(); 
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});