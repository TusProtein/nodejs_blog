import passport from '../../passport/passportFacebook.js';
import Product from '../models/Product.js';
class SiteController {
  //[GET] /news
  index(req, res, next) {
    Product.find({})
      // lean() ==> Mongoose Documents -> Object JavaScript
      .lean()
      .then(products =>
        res.render('home', {
          products,
        }),
      )
      .catch(next);
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
}

export default new SiteController();
