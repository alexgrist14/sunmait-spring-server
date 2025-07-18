"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Companies", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      industry: { type: Sequelize.STRING, allowNull: false },
      address: { type: Sequelize.STRING },
      contact_email: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT },
      enable_advanced: { type: Sequelize.BOOLEAN },
      advanced_type: { type: Sequelize.STRING },
      advanced_note: { type: Sequelize.STRING },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Companies");
  },
};
