const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv/config');

mongoose.connect(
  process.env.DB_CONNECTION, 
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to MongoDB')
);

// Create a schema and model for your MongoDB collection
const exampleSchema = new mongoose.Schema({
  name: String,
  age: Number
});
const ExampleModel = mongoose.model('Example', exampleSchema);

app.get('/api', (req, res) => {
  res.send('Deneme');
});

app.get('/api/examples', async (req, res) => {
  try {
    // Query the collection and retrieve all documents
    const examples = await ExampleModel.find();
    res.json(examples);
  } catch (error) {
    console.error('Error querying collection', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/query', async (req, res) => {
  try {
    // Query the collection based on your specific criteria
    const queryResult = await ExampleModel.find({ age: { $gt: 25 } });
    res.json(queryResult);
  } catch (error) {
    console.error('Error querying collection', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('API server is listening on port 3000');
});
