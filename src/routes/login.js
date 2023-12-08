import express from 'express';
import loginController from '../app/controllers/LoginController.js';

const router = express.Router();

router.get('/', loginController.login);
router.post('/', loginController.postLogin);

export default router;
