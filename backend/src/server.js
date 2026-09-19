const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Importação das rotas
const pontoRoutes = require('./routes/pontoRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); 
const roteiroRoutes = require('./routes/roteiroRoutes');
const motoristaRoutes = require('./routes/motoristaRoutes');
// Rota base para os pontos
app.use('/api/pontos', pontoRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/roteiros', roteiroRoutes); 
app.use('/api/motoristas', motoristaRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API do Parô? rodando sobre rodas!' });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});