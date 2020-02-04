import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      { sequelize, modelName: 'users' }
    );
    return this;
  }

  static checkPassword(password, password_hash) {
    return bcrypt.compare(password, password_hash);
  }
}

export default Users;
