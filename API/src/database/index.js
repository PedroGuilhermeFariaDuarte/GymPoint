import Sequelize from 'sequelize';
import DatabaseConfig from '../config/database';
import User from '../app/models/Users';
import Students from '../app/models/Students';
import Plans from '../app/models/Plans';
import Enrollment from '../app/models/Enrollment';
import Checkins from '../app/models/Checkins';
import HelpOrders from '../app/models/HelpOrders';

const models = [User, Students, Plans, Enrollment, Checkins, HelpOrders];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(DatabaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
