import { Router } from 'express';

// Controller
import PlanController from '../app/controllers/PlanController';

// Get func token validation
import Auth from '../app/middlewares/auth';

//Check if exists adminID
import checkAdmin from '../app/middlewares/checkAdmin';

const router = new Router();

// Routes for Admin, management all plans and enrollaments (CRUD)
// Plans
router.route('/plans').post(Auth, PlanController.store);

router
  .route('/plans/:idPlan/myplan')
  .get(Auth, checkAdmin, PlanController.show);

router.route('/plans/list').get(Auth, checkAdmin, PlanController.index);

router
  .route('/plans/:idPlan/upplan')
  .put(Auth, checkAdmin, PlanController.update);

router
  .route('/plans/:idPlan/delplan')
  .delete(Auth, checkAdmin, PlanController.delete);

export default router;
