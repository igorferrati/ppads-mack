const Controller = require('./Controller.js');
const RegistroServices = require('../services/RegistroServices.js');

const registroServices = new RegistroServices();

class RegistroController extends Controller {
    constructor() {
        super(registroServices);
    }
}

module.exports = RegistroController;
