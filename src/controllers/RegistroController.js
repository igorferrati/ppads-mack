const database = require('../models'); //index.js gerencia todos métodos dentro de models

class RegistroController {
    static async getAll (req, res) {
        try {
            const listaDeRegistros = await database.Registro.findAll();
            return res.status(200).json(listaDeRegistros)
        } catch (erro) {
            //erro
        }
    }
}

module.exports = RegistroController;
