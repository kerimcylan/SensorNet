const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Web Sunucusuuuuuuuuuuuuuu!');
});

app.get('/api', (req, res) => {
  res.send('Web Sunucusuuuuuuuuuuuuuu!');
});

app.get('/apik', (req, res) => {
  res.send('Web Sunucusuuuuuuuuuuuuuu!');
});


app.listen(3000, () => {
  console.log('Web server is listening on port 3000');
});


