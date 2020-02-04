import Sequelize, { Model } from 'sequelize';
class Checkins extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      { sequelize, modelName: 'checkins' }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.students, {
      foreignKey: 'student_id',
      as: 'student_check',
    });
  }
}

export default Checkins;
