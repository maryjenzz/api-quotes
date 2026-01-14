const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

const quotesPath = path.join(__dirname, 'data', 'quotes.json');

let quotes = [];

try {
  const data = fs.readFileSync(quotesPath, 'utf8');
  quotes = JSON.parse(data);
} catch (err) {
  console.error('Erro ao ler quotes.json:', err);
}

app.get('/', (req, res) => {
  res.send('API de citações motivacionais em funcionamento!');
});

app.get('/quote', (req, res) => {
  if (!Array.isArray(quotes) || quotes.length === 0) {
    return res.status(500).json({ error: 'Nenhuma citação disponível.' });
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json(quotes[randomIndex]);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
