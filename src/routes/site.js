import express from 'express';
import siteController from '../app/controllers/SiteController.js';
import privateController from '../app/controllers/PrivateController.js';
import {
  checkLogin,
  checkAllMiddleware,
  checkStudentMiddleware,
  checkTeacherMiddleware,
} from '../app/middlewares/authorizationMiddleWear.js';
import passport from 'passport';
import generateJWT from '../utils/generateJWT.js';

const router = express.Router();
router.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    authType: 'reauthenticate',
  }),
);

// Callback Fb trả về
// router.get(
//   '/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     // session: false,
//     successRedirect: '/me/stored-products',
//     failureRedirect: '/',
//   }),
//   (req, res) => {
//     // Xác thực thành công, thông tin người dùng đã được lưu vào session
//     const token = req.user.token;
//     console.log(token);

//     res.cookie('token', token, { secure: true, httpOnly: true });
//   },
// );

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res, next) => {
    const oneHour = 3600000;

    // Sau khi xác thực Facebook, tạo và đặt token vào cookie
    const token = req.user.token;
    res.cookie('token', token, {
      maxAge: oneHour,
      secure: true,
      httpOnly: true,
    });
    next();
  },
  (req, res) => {
    // Xử lý sau khi đăng nhập và kiểm tra token thành công
    res.redirect('/home');
  },
);

// router.get(
//   '/checkToken',
//   (req, res, next) => {
//     try {
//       const token = req.user.token;
//       res.cookie('token', token, { secure: true, httpOnly: true });
//       res.send('Thanh cong roi');
//     } catch (error) {
//       console.log(error);
//       res.json('Invalid Token');
//     }
//   },
//   checkLogin,
// );

router.get(
  '/task',
  checkLogin,
  checkAllMiddleware,
  privateController.getAllTasks,
);
router.get(
  '/student',
  checkLogin,
  checkStudentMiddleware,
  privateController.private,
);
router.get(
  '/teacher',
  checkLogin,
  checkTeacherMiddleware,
  privateController.private,
);

router.get('/homePaginations', siteController.homePaginations);
router.get('/testApi', siteController.testApi);
router.get('/api/users', siteController.apiUsers);
router.get('/logout', siteController.logout);
router.get('/update-password', checkLogin, siteController.updatePassword);
router.put('/:id/update-password', siteController.putUpdatePassword);
router.get('/register', siteController.register);
router.post('/register', siteController.postRegister);
router.get('/home', checkLogin, siteController.index);
// router.get('/:slug', siteController.search);

export default router;
