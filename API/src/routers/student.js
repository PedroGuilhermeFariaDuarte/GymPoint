import { Router } from 'express';

// Controller
import StudentController from '../app/controllers/StudentController';
import CheckinsController from '../app/controllers/CheckinsController';
import HelpOrdersController from '../app/controllers/HelpOrdersController';
// Get func token validation
import Auth from '../app/middlewares/auth';

//Check if exists adminID
import checkAdmin from '../app/middlewares/checkAdmin';

// Get func student validation
import checkStudents from '../app/middlewares/checkStudents';

const router = new Router();

// Route for insert news student, only admin, if auth with success
router
  .route('/students')
  .post(Auth, checkAdmin, StudentController.store)
  .get(Auth, checkAdmin, StudentController.index);

router
  .route('/student/:id')
  .get(Auth, checkAdmin, StudentController.show)
  .put(Auth, checkAdmin, StudentController.update)
  .delete(Auth, checkAdmin, StudentController.delete);

// checkin's
router
  .route('/students/:idStudent/checkins')
  .post(checkStudents, CheckinsController.store)
  .get(Auth, checkAdmin, checkStudents, CheckinsController.index);

router.route('/students/checkins').get(CheckinsController.show);

// Routes for students and Admins, help & answer
router
  .route('/students/:idStudent/helpOrders')
  .post(checkStudents, HelpOrdersController.store)
  // Route for only admin
  .get(Auth, checkAdmin, checkStudents, HelpOrdersController.show);

export default router;
