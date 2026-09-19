const express = require('express');
const router = express.Router();
const pontoController = require('../controllers/pontoController');

// Define as rotas PUT (atualização) para os pontos
router.put('/:id/chegada', pontoController.registrarChegada);
router.put('/:id/saida', pontoController.registrarSaida);

module.exports = router;