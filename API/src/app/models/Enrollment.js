import Sequelize, { Model, d } from 'sequelize';
import { isBefore, isAfter, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        plain_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        start_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        end_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
            'start_date',
            'end_date',
          ]),
          get() {
            return (
              isBefore(this.get('start_date'), new Date()) &&
              isAfter(this.get('end_date'), new Date())
            );
          },
        },
        congratulations: {
          type: Sequelize.VIRTUAL,
          get() {
            return `Parabéns, você se matriculou com sucesso! <br> Você começa
            em ${this.start_date} e termina em ${this.end_date}.
            <br>
            O preço total da sua matricula ficou em R$${this.price}
            <br>
            estamos te esperando`;
          },
        },
        inicio: {
          type: Sequelize.VIRTUAL,
          get() {
            return format(this.start_date, "dd 'de' MMMM 'de' yyyy", {
              locale: pt,
            });
          },
        },
        termino: {
          type: Sequelize.VIRTUAL,
          get() {
            return format(this.end_date, "dd 'de' MMMM 'de' yyyy", {
              locale: pt,
            });
          },
        },
      },
      { sequelize, modelName: 'enrollment' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.students, {
      foreignKey: 'student_id',
      as: 'student',
    });
    this.belongsTo(models.plans, { foreignKey: 'plain_id', as: 'plan' });
  }
}

export default Enrollment;
