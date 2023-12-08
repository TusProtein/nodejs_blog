import jwt from 'jsonwebtoken';
import User from '../models/User.js';

function checkLogin(req, res, next) {
  try {
    // get Cookie
    let token = req.cookies.token;

    let data = jwt.verify(token, process.env.JWT_SECRET);
    if (data) {
      User.findOne({ _id: data._id })
        .lean()
        .then(data => {
          if (data) {
            req.data = data;
            let username = data.username;
            res.username = username;
            next();
          }
        })
        .catch(err => console.log(err));
    }
  } catch (error) {
    return res.redirect('/login');
  }
}

function checkAllMiddleWear(req, res, next) {
  if (req.data.role >= 0) {
    next();
  } else {
    res.json('NOT PERMISSION!!!');
  }
}

function checkStudentMiddleWear(req, res, next) {
  if (req.data.role >= 1) {
    next();
  } else {
    res.json('NOT PERMISSION!!!');
  }
}

function checkTeacherMiddleWear(req, res, next) {
  if (req.data.role >= 2) {
    next();
  } else {
    res.json('NOT PERMISSION!!!');
  }
}

export {
  checkLogin,
  checkAllMiddleWear,
  checkStudentMiddleWear,
  checkTeacherMiddleWear,
};
