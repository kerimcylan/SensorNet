const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.send('Deneme Son Durum part 2');
});

app.listen(3000, () => {
  console.log('API server is listening on port 3000');
});
