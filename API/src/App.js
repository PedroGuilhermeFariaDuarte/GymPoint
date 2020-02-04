import express from 'express';
import json from 'body-parser';
import cors from 'cors';

// Database
import '../src/database';

// Routers
import Authentication from './routers/authentication';
import Enrollment from './routers/enrollments';
import Student from './routers/student';
import Help from './routers/help';
import Plan from './routers/plan';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(json());
  }

  routes() {
    this.server.use(Authentication);
    this.server.use(Enrollment);
    this.server.use(Student);
    this.server.use(Help);
    this.server.use(Plan);
  }
}

export default new App().server;
