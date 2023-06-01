const express = require('express');
const mongoose = require("mongoose");
const app = express();

require('dotenv/config');


const all = await dummy.find(filter);

app.get('/api', (req, res) => {
  res.send(all);
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
