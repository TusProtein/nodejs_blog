import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class LoginController {
  //[GET] /
  login(req, res, next) {
    res.render('./auth/login');
  }
  //[POST] /
  postLogin(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({
      username,
      password,
    })
      .then(data => {
        if (data) {
          let token = jwt.sign(
            {
              _id: data._id,
            },
            process.env.JWT_SECRET,
          );
          // set Cookie
          res.cookie('token', token);
          return res.json({
            message: 'Bạn đã đăng nhập thành công',
            token,
          });
        } else {
          return res.json('that bai');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default new LoginController();
