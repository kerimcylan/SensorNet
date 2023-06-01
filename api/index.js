const express = require('express');
const mongoose = require("mongoose");
const app = express();

require('dotenv/config');


app.get('/api', async (req, res) => {
  try {
    const data = await mongoose.connection.db.collection('dummy').find().toArray();

    res.json(data);
  } catch (err) {
    console.error('Query Error: ', err);
    res.status(500).send('Query Error ');
  }
});

//CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECTION, 
  { useNewURLparser: true},
  () => console.log('connected to Database')
);

app.listen(3000, () => {
  console.log('API server is listening on port 3000');
});
