const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.send('Workflow denemesi part 3 umarım son olur musun artık lütfen bit');
});

app.listen(3000, () => {
  console.log('API server is listening on port 3000');
});
