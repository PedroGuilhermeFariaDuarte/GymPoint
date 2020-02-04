import Sequelize, { Model } from 'sequelize';

class HelpOrders extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: {
          type: Sequelize.INTEGER,
        },
        question: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        answer: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        answer_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        answer_description: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${
              this.answer == null || this.answer_at == true
                ? 'Esta duvida ainda não foi respondida'
                : `Duvida respondida em ${this.answer_at}`
            }`;
          },
        },
      },
      { sequelize, modelName: 'help_orders' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.students, {
      foreignKey: 'student_id',
      as: 'student_help',
    });
  }
}

export default HelpOrders;
