const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Son Deneme artık yeter lütfen!');
});

app.get('/api', (req, res) => {
  res.send('Web Sunucusuuuuuuudhffdhhfdfduuuuuuu!');
});


app.listen(3000, () => {
  console.log('Web server is listening on port 3000');
});


