'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pessoa.init({
    nome: DataTypes.STRING,
    responsavel: DataTypes.STRING,
    falta: DataTypes.INTEGER,
    aluno_presente: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
  });
  return Pessoa;
};