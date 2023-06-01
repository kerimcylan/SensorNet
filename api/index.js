const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv/config');

const dbURI = 'mongodb+srv://khassensor:Nt!51f3!k@khassensornetwork.biwmfgq.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB\'ye bağlandı'))
  .catch((error) => console.error('MongoDB bağlantısı başarısız:', error));

// MongoDB koleksiyonu için şema ve model oluştur
const exampleSchema = new mongoose.Schema({
  name: String,
  age: Number
});
const ExampleModel = mongoose.model('Example', exampleSchema);

app.get('/api', (req, res) => {
  res.send('Deneme');
});

app.get('/api/examples', async (req, res) => {
  try {
    // Koleksiyondaki tüm belgeleri sorgula ve al
    const examples = await ExampleModel.find();
    res.json(examples);
  } catch (error) {
    console.error('Koleksiyon sorgulanırken hata oluştu', error);
    res.status(500).json({ error: 'İç sunucu hatası' });
  }
});

app.get('/api/query', async (req, res) => {
  try {
    // Belirli kriterlere göre koleksiyonda sorgu yap
    const queryResult = await ExampleModel.find({ age: { $gt: 25 } });
    res.json(queryResult);
  } catch (error) {
    console.error('Koleksiyon sorgulanırken hata oluştu', error);
    res.status(500).json({ error: 'İç sunucu hatası' });
  }
});

app.listen(3000, () => {
  console.log('API sunucusu 3000 numaralı portta dinleniyor');
});
