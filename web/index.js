const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Serap görsün!');
});

app.get('/api', (req, res) => {
  res.send('Deneme');
});

app.listen(3000, () => {
  console.log('Web server is listening on port 3000');
});


