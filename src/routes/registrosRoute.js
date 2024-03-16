const { Router } = require('express');
const RegistroController = require('../controllers/RegistroController.js');

const registroController = new RegistroController();

const router = Router();

router.get('/registros', (req, res) => registroController.getAll(req, res));

module.exports = router;
