const express = require('express');
const router = express.Router();
const motoristaController = require('../controllers/motoristaController');

router.get('/', motoristaController.listar);
router.post('/', motoristaController.criar);

module.exports = router;