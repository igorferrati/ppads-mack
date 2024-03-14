'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('registros',[
      {
        nome: 'Igor Teste',
        materia: 'Matemática',
        turma: '5A',
        faltas: 1,
        registro: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Pedro Teste',
        materia: 'Português',
        turma: '5A',
        faltas: 3,
        registro: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Maria Teste',
        materia: 'Ciências',
        turma: '5A',
        faltas: 0,
        registro: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ] ,{});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('registros', null, {});
  }
};
