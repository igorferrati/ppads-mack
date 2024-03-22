const dataSource = require('../models'); //index.js gerencia todos métodos dentro de models

class Services {
    constructor(nomeModelo){
        this.model = nomeModelo
    }

    async getAllRegistros() {
        return dataSource[this.model].findAll();
    }
}

module.exports = Services;
