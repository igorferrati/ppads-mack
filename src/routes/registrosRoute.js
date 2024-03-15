const { Router } = require('express');
const RegistroController = require('../controllers/RegistroController.js')

const router = Router();

router.get('/registros', RegistroController.getAll);

module.exports = router;
