const express = require('express');
const mongoose = require("mongoose");
const app = express();

require('dotenv/config');


router.get('/api', async (req,res) => {
  //res.send("We are on posts");
  try{
      const posts = await dummy.find();
      res.json(posts);
  }catch(err){
      res.json({message: err});
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
