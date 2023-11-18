import express from 'express';
import productController from '../app/controllers/ProductController.js';

const router = express.Router();

router.post('/store', productController.store);
router.put('/:id', productController.update);
router.patch('/:id/restore', productController.restore);
router.delete('/:id', productController.destroy);
router.delete('/:id/force', productController.forceDelete);
router.get('/:id/edit', productController.edit);
router.get('/create', productController.create);
router.get('/:slug', productController.show);

export default router;
