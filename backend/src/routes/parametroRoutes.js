const express = require('express');
const router = express.Router();
const parametroController = require('../controllers/parametroController');

router.get('/', parametroController.getParametros);
router.put('/', parametroController.updateParametros);

module.exports = router;