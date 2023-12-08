import express from 'express';
import privateController from '../app/controllers/PrivateController.js';
import {
  checkLogin,
  checkAllMiddleWear,
  checkStudentMiddleWear,
  checkTeacherMiddleWear,
} from '../app/middlewares/authorizationMiddleWear.js';

const router = express.Router();

router.get('/', checkLogin, checkAllMiddleWear, privateController.private);
router.get(
  '/student',
  checkLogin,
  checkStudentMiddleWear,
  privateController.private,
);
router.get(
  '/teacher',
  checkLogin,
  checkTeacherMiddleWear,
  privateController.private,
);

export default router;
