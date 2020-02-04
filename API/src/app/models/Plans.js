import Sequelize, { Model } from 'sequelize';

class Plans extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        duration: {
          type: Sequelize.INTEGER,
          allowNull: null,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        description_price: {
          type: Sequelize.VIRTUAL,
          get() {
            return `Plano de ${this.duration} ${
              this.duration > 1 ? 'meses' : 'mês'
            } por R$${this.price}/mês`;
          },
        },
        description_duration: {
          type: Sequelize.VIRTUAL,
          get() {
            return `Seu plano tem a duração de ${this.duration} ${
              this.duration > 1 ? 'meses' : 'mês'
            }`;
          },
        },
      },
      { sequelize, modelName: 'plans' }
    );

    return this;
  }
}

export default Plans;
