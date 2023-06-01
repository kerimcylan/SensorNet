const express = require('express');
const app = express();
const mongoose = require("mongoose");

require('dotenv/config');

mongoose.connect(
  process.env.DB_CONNECTION, 
  { useNewURLparser: true},
  () => console.log('connected to DB')
);

const User = mongoose.model('User', {
  name: String,
  email: String
});

const sampleUser = new User({
  name: 'John Doe',
  email: 'johndoe@example.com'
});

sampleUser.save()
  .then(() => {
    console.log('Sample user saved to the database');
  })
  .catch((error) => {
    console.error('Failed to save sample user:', error);
  });

  app.get('/api/users', (req, res) => {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((error) => {
        console.error('Failed to fetch users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
      });
  });
  

  app.get('/api', (req, res) => {
    res.send('Deneme');
  });
  

  app.listen(3000, () => {
    console.log('API server is listening on port 3000');
  });

