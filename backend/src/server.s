const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Importação das rotas
const pontoRoutes = require('./routes/pontoRoutes');

// Rota base para os pontos
app.use('/api/pontos', pontoRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API do Parô? rodando sobre rodas!' });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});