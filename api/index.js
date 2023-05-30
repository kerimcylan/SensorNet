const express = require('express');
const mongoose = require("mongoose");
const app = express();

require('dotenv/config');


app.get('/api', (req, res) => {
  res.send('Serap görsüns');
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
