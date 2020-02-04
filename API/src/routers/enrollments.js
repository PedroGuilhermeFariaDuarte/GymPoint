import { Router } from 'express';

// Controller
import EnrollmentController from '../app/controllers/EnrollmentController';

// Get func token validation
import Auth from '../app/middlewares/auth';

//Check if exists adminID
import checkAdmin from '../app/middlewares/checkAdmin';

const router = new Router();

// Enrollments
router
  .route('/enrollments')
  .post(Auth, checkAdmin, EnrollmentController.store)
  .get(Auth, checkAdmin, EnrollmentController.index);

router
  .route('/enrollments/:idEnrolmment')
  .get(Auth, checkAdmin, EnrollmentController.show)
  .delete(Auth, checkAdmin, EnrollmentController.delete)
  .put(Auth, checkAdmin, EnrollmentController.update);

export default router;
