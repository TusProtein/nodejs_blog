import express from 'express';
import meController from '../app/controllers/MeController.js';

const router = express.Router();

router.get('/stored-products', meController.edit);

export default router;
