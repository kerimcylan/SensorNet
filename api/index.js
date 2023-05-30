const express = require('express');
const mongoose = require("mongoose");
const app = express();

require('dotenv/config');


const DataModel = mongoose.model('Data', new mongoose.Schema({
  _id: String,
  Date: String,
  "Nitric oxide": Number,
  Status: String,
  "Nitrogen dioxide": Number,
  "Nitrogen oxides as nitrogen dioxide": String
}, {
  collection: 'dummy'
}));


app.get('/api', async (req, res) => {
  try {
    const data = await DataModel.find();

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
  () => console.log('connected to DB')
);

app.listen(3000, () => {
  console.log('API server is listening on port 3000');
});
