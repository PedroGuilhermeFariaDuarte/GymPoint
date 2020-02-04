import { Router } from 'express';

// Controller
import AuthenticationController from '../app/controllers/AuthenticationController';

const router = new Router();

// Route for auth a admin
//router.route('/authetication').all();

router.route('/authetication').post(AuthenticationController.store);

export default router;
