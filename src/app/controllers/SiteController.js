import passport from '../../passport/passportFacebook.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import paginations from '../../utils/paginations.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SiteController {
  //[GET] /news
  index(req, res, next) {
    // Product.find({})
    //   // lean() ==> Mongoose Documents -> Object JavaScript
    //   .lean()
    //   .then(products =>
    //     res.render('home', {
    //       products,
    //     }),
    //   )
    //   .catch(next);
    res.render('home');
  }

  async homePaginations(req, res) {
    try {
      let page = req.query.page;
      let dataObj;
      if (page) {
        // Get api theo Page
        dataObj = await paginations(Product, page);
        res.json(dataObj);
      } else {
        // Get all Product
        dataObj = await paginations(Product);
        res.json(dataObj);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json('Loi server');
    }
  }

  //[GET] /:slug
  search(req, res) {
    res.render('search');
  }

  logout(req, res) {
    try {
      // Xóa cookie để đăng xuất với JWT
      res.clearCookie('token');

      // Xử lý đăng xuất với session
      req.logout(() => {
        res.redirect('/');
      });
    } catch (error) {
      console.log(error);
    }
  }

  // handleFacebookLogin(req, res) {
  //   try {
  //     // Xác thực người dùng từ Facebook, lấy thông tin người dùng từ req.user
  //     const token = req.user.token;
  //     console.log('Token:', token);

  //     // Gửi token về cho client, có thể lưu vào cookie hoặc truyền trong response
  //     res.cookie('token', token, { secure: true, httpOnly: true });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // }

  register(req, res) {
    res.render('./auth/register', { noLayout: true, noContainerClass: true });
  }

  postRegister(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Tên người dùng và mật khẩu là bắt buộc' });
    }

    User.findOrCreate({ username, password }, (err, data, created) => {
      if (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
      }
      if (!created) {
        return res.status(409).json({ error: 'Tài khoản đã tồn tại' });
      }
      res.json({ success: true });
    });
  }

  // Update password
  //GET /:id
  updatePassword(req, res, next) {
    let token = req.cookies.token;
    const publicKey = fs.readFileSync('public.pem', 'utf-8');

    let data = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

    const userId = data._id;
    res.render('auth/update-password', { userId });
  }

  //PUT /:id
  putUpdatePassword = async (req, res) => {
    let newPassword = req.body.newPassword;
    let id = req.params.id;

    try {
      const data = await User.findByIdAndUpdate(id, { password: newPassword });
      res.json({ success: 'Đổi mật khẩu thành công' });
    } catch (error) {
      console.log(error);
      res.json('doi mk that bai');
    }
  };

  // Get All Users
  async apiUsers(req, res) {
    try {
      let page = req.query.page;
      let dataObj;
      if (page) {
        // Get api theo Page
        dataObj = await paginations(User, page);
        res.json(dataObj);
      } else {
        // Get all user
        dataObj = await paginations(User);
        res.json(dataObj);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json('Loi server');
    }
  }

  async testApi(req, res) {
    res.render('./paginations/paginations');
  }
}
export default new SiteController();
