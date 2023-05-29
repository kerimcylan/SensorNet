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



//ROUTES  get:get the info  post:give the info  delete patch:updates 
app.get('/', (req,res) => {
    res.send("We are on home and system can connect to the data base.");
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
