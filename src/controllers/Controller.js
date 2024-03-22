class Controller {
    constructor (entidadeService) {
        this.entidadeService = entidadeService;
    }

    async getAll(req, res) {
        try {
            const listaDeRegistros = await this.entidadeService.getAllRegistros();
            return res.status(200).json(listaDeRegistros)
        } catch {
            //erro
        }
    }
}

module.exports = Controller;