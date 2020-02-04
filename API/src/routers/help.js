import { Router } from 'express';

// Controller
import HelpOrdersController from '../app/controllers/HelpOrdersController';

// Get func token validation
import Auth from '../app/middlewares/auth';

//Check if exists adminID
import checkAdmin from '../app/middlewares/checkAdmin';

const router = new Router();

// Route for only admin
router
  .route('/helpOrders/all')
  .get(Auth, checkAdmin, HelpOrdersController.index);

// Route for only admin
router
  .route('/helpOrders/:idAnswer/answer')
  .put(Auth, checkAdmin, HelpOrdersController.update);

export default router;
