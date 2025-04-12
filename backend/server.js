const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors')
const app = express();
const PORT = 5000;

app.use(cors());

const MONGO_URL = 'mongodb://mongo:27017';
const DB_NAME = 'myappdb';

app.get('/api', async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    const db = client.db(DB_NAME);
    const messages = db.collection('messages');

    // insert sample if empty
    const count = await messages.countDocuments();
    if (count === 0) {
      await messages.insertOne({ text: 'Hello from MongoDB!' });
    }

    const latest = await messages.findOne({}, { sort: { _id: -1 } });
    res.json({ message: latest.text });
    client.close();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'MongoDB connection failed' });
  }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
