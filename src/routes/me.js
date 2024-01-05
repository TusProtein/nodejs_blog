import express from 'express';
import meController from '../app/controllers/MeController.js';
import { checkLogin } from '../app/middlewares/authorizationMiddleWear.js';

const router = express.Router();

router.get('/stored-products', checkLogin, meController.storedProducts);
router.get('/trash-products', checkLogin, meController.trashProducts);

export default router;
