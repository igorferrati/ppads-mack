'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Registro.init({
    nome: DataTypes.STRING,
    materia: DataTypes.STRING,
    turma: DataTypes.STRING,
    faltas: DataTypes.INTEGER,
    registro: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Registro',
    tableName: 'registros'
  });
  return Registro;
};