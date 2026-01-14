// Importa o framework Express para criar o servidor web
const express = require('express');

// Importa o módulo fs (file system) para operações com arquivos
const fs = require('fs');

// Importa o módulo path para trabalhar com caminhos de arquivos
const path = require('path');

// Importa o módulo cors para permitir requisições de diferentes origens
const cors = require('cors');

// Cria uma instância da aplicação Express
const app = express();

// Define a porta onde o servidor irá rodar
const PORT = 3000;

// Habilita o CORS para todas as rotas da aplicação
app.use(cors());

// Constrói o caminho completo para o arquivo quotes.json na pasta 'data'
const quotesPath = path.join(__dirname, 'data', 'quotes.json');

// Declara um array vazio que irá armazenar as citações
let quotes = [];

// Inicia um bloco try-catch para tratamento de erros
try {
  // Lê o arquivo quotes.json de forma síncrona e armazena o conteúdo como string
  const data = fs.readFileSync(quotesPath, 'utf8');
  
  // Converte a string JSON em um objeto JavaScript e armazena no array quotes
  quotes = JSON.parse(data);
} catch (err) {
  // Se houver erro na leitura ou parsing do arquivo, exibe a mensagem de erro
  console.error('Erro ao ler quotes.json:', err);
}

// Define uma rota GET para a raiz ('/') que retorna uma mensagem simples
app.get('/', (req, res) => {
  // Envia uma resposta em texto informando que a API está funcionando
  res.send('API de citações motivacionais em funcionamento!');
});

// Define uma rota GET para '/quote' que retorna uma citação aleatória
app.get('/quote', (req, res) => {
  // Verifica se quotes é um array válido e se contém elementos
  if (!Array.isArray(quotes) || quotes.length === 0) {
    // Se não houver citações, retorna erro 500 com mensagem
    return res.status(500).json({ error: 'Nenhuma citação disponível.' });
  }
  
  // Gera um índice aleatório baseado no tamanho do array de citações
  const randomIndex = Math.floor(Math.random() * quotes.length);
  
  // Seleciona a citação correspondente ao índice aleatório
  const randomQuote = quotes[randomIndex];
  
  // Retorna a citação selecionada em formato JSON
  res.json(randomQuote);
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  // Exibe mensagem no console confirmando que o servidor está rodando
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
