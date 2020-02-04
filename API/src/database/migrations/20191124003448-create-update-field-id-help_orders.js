'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('help_orders', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
    });
  },
};
