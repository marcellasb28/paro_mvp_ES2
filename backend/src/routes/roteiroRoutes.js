const express = require('express');
const router = express.Router();
const roteiroController = require('../controllers/roteiroController');

// Rota para cadastrar um novo Roteiro completo
router.post('/', roteiroController.criarRoteiro);
// Rota PUT para acionar o recálculo financeiro de um roteiro específico
router.put('/:id/calcular-custo', roteiroController.calcularCustoRoteiro);

module.exports = router;