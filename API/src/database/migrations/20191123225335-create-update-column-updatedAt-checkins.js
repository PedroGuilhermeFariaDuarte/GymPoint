'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('checkins', 'updated_at', {
      type: Sequelize.DATE,
    });
  },
};
