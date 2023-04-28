const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.send('Deneme Son Durum');
});

app.listen(3000, () => {
  console.log('API server is listening on port 3000');
});
