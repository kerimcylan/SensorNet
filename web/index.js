const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Web server!');
});

app.get('/api', (req, res) => {
  res.send('Hello from Web server!');
});

app.get('/apik', (req, res) => {
  res.send('Hello from Web server!');
});


app.listen(3000, () => {
  console.log('Web server is listening on port 3000');
});
