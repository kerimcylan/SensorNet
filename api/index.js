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

  app.get('/api', (req, res) => {
    res.send('Deneme');
  });
  



