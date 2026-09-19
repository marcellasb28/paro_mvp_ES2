const express = require('express');
const router = express.Router();
const roteiroController = require('../controllers/roteiroController');

// Rota PUT para acionar o recálculo financeiro de um roteiro específico
router.put('/:id/calcular-custo', roteiroController.calcularCustoRoteiro);

module.exports = router;