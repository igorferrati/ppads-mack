const Services= require('./Services.js')

//herda de Services to seus métodos
class RegistroServices extends Services {
    constructor() {
        //nomeModelo
        super('Registro');
    }
}

module.exports = RegistroServices;