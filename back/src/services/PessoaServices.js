const Services= require('./Services.js')

//herda de Services to seus métodos
class PessoaServices extends Services {
    constructor() {
        //nomeModelo
        super('Pessoa');
    }
}

module.exports = PessoaServices;
