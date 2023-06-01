const express = require('express');
const app = express();
const mongoose = require("mongoose");

const dbURI = 'mongodb+srv://khassensor:Nt!51f3!k@khassensornetwork.biwmfgq.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB\'ye bağlandı');

    const dummySchema = new mongoose.Schema({
      name: String,
      age: Number
    });

    const DummyModel = mongoose.model('Dummy', dummySchema);

    // Örnek verileri ekle
    const dummyData = [
      { name: 'John Doe', age: 30 },
      { name: 'Jane Smith', age: 28 },
      { name: 'Bob Johnson', age: 35 }
    ];

    DummyModel.insertMany(dummyData)
      .then(() => console.log('Örnek veriler eklendi'))
      .catch((error) => console.error('Örnek veri ekleme hatası:', error));
  })
  .catch((error) => console.error('MongoDB bağlantısı başarısız:', error));

app.get('/api', (req, res) => {
  res.send('Deneme');
});

app.get('/api/examples', async (req, res) => {
  try {
    const examples = await DummyModel.find();
    res.json(examples);
  } catch (error) {
    console.error('Koleksiyon sorgulanırken hata oluştu', error);
    res.status(500).json({ error: 'İç sunucu hatası' });
  }
});

app.get('/api/query', async (req, res) => {
  try {
    const queryResult = await DummyModel.find({ age: { $gt: 25 } });
    res.json(queryResult);
  } catch (error) {
    console.error('Koleksiyon sorgulanırken hata oluştu', error);
    res.status(500).json({ error: 'İç sunucu hatası' });
  }
});

app.listen(3000, () => {
  console.log('API sunucusu 3000 numaralı portta dinleniyor');
});
