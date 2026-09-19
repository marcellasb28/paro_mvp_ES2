const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Rota GET para buscar os dados do painel
router.get('/resumo', dashboardController.getResumoDashboard);

module.exports = router;