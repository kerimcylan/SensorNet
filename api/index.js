const express = require('express');
const mongoose = require("mongoose");
const app = express();

require('dotenv/config');
mongoose.set('strictQuery', false);

// Define the schema for your collection
const DateSchema = new mongoose.Schema({
  NitricOxide: Number,
});

const Date = mongoose.model('Date', DateSchema);

app.get('/api', (req, res) => {
  // Use the appropriate query to find documents with Nitric oxide less than 5
  Date.find({ NitricOxide: { $lt: 5 } })
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while querying the database' });
    });
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    // Start the server after successfully connecting to the database
    app.listen(3000, () => {
      console.log('API server is listening on port 3000');
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });


