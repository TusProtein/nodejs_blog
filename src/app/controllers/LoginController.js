import passport from '../../passport/passportLocal.js';
import generateJWT from '../../utils/generateJWT.js';
class LoginController {
  //[GET] /
  login(req, res, next) {
    res.render('./auth/login', { noLayout: true });
  }
  //[POST] /
  postLogin(req, res, next) {
    const oneHour = 3600000;

    passport.authenticate('local', (err, user) => {
      if (err) return next(err);
      if (!user) {
        return res.json('that bai'); // Xác thực thất bại
      }

      const token = generateJWT(user);
      // Set Cookie
      res.cookie('token', token, {
        maxAge: oneHour,
        secure: true,
        httpOnly: true,
      });
      return res.json({
        message: 'Bạn đã đăng nhập thành công',
        token,
      });
    })(req, res, next);
  }
}

export default new LoginController();
