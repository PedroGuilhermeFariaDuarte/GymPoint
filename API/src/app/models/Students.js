import Sequelize, { Model } from 'sequelize';

class Students extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        idade: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        altura: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        peso: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
      },
      { sequelize, modelName: 'students' }
    );

    return this;
  }
}

export default Students;
