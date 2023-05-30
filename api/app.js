// To be able to execute server "app.js" added to scripts in package.json

//PACKAGES
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')

require('dotenv/config');

//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

//app.use('/posts', () => {

  //  console.log("This is a middelware running.")
//});

//IMPORT ROUTES
const postsRoute = require('./routes/posts')

app.use('/posts', postsRoute);

app.get('/', (req,res) => {
  res.send("We are on home");
});


//CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewURLParser: true },
  (err) => {
    if (err) {
      console.error('DB connection error:', err);
    } else {
      console.log('Connected to DB');
    }
  }
);



app.listen(3000)