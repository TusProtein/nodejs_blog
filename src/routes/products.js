import express from 'express';
import productController from '../app/controllers/ProductController.js';
import {
  checkLogin,
  checkTeacherMiddleware,
} from '../app/middlewares/authorizationMiddleWear.js';

const router = express.Router();

router.post('/handle-form-delete', productController.handleForm);
router.post('/handle-form-restore-deleteForce', productController.handleForm);
router.post('/store', productController.store);
router.put('/:id', productController.update);
router.patch('/:id/restore', productController.restore);
router.delete('/:id', productController.destroy);
router.delete('/:id/force', productController.forceDelete);
router.get('/:id/edit', productController.edit);
router.get(
  '/create',
  checkLogin,
  checkTeacherMiddleware,
  productController.create,
);
router.get('/:slug', productController.show);

export default router;
