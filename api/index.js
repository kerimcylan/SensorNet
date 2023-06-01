const express = require('express');
const mongoose = require("mongoose");
const app = express();

require('dotenv/config');
mongoose.set('strictQuery', false);

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


  const DataSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    Date: {
      type: String,
      required: true,
    },
    "Nitric oxide": {
      type: Number,
      required: true,
    },
    Status: {
      type: String,
      required: true,
    },
    "Nitrogen dioxide": {
      type: Number,
      required: true,
    },
    "Nitrogen oxides as nitrogen dioxide": {
      type: Number,
      required: true,
    },
  });

  const DataModel = mongoose.model('Data', DataSchema);

app.get('/api', (req, res) => {
  // Use the appropriate query to find documents with Nitric oxide less than 5
  DataModel.find({ "Nitric oxide": { $lt: 5 } })
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while querying the database' });
    });
});



