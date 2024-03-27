'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pessoas',[
      {
        nome_aluno: 'Pedro Muller',
        responsavel_aluno: 'Pablo Muller',
        falta: 1,
        aluno_presente: true,
        matricula: 109104,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome_aluno: 'Gabriela Viena',
        responsavel_aluno: 'Carlos Viena',
        falta: 1,
        aluno_presente: true,
        matricula: 109105,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome_aluno: 'João Henrique Silva',
        responsavel_aluno: 'Fatima Batz',
        falta: 1,
        aluno_presente: true,
        matricula: 109106,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome_aluno: 'Paloma Miranda',
        responsavel_aluno: 'Bruna Flores',
        falta: 1,
        aluno_presente: true,
        matricula: 109107,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ] ,{});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pessoas', null, {});
  }
};
