import jwt from 'jsonwebtoken';
import fs from 'fs';
import User from '../models/User.js';
import { ObjectId } from 'mongodb';

const checkLogin = (req, res, next) => {
  try {
    // Get cookie
    let token = req.cookies.token;

    if (!token) {
      // Token không tồn tại, chuyển hướng hoặc xử lý một cách phù hợp
      res.redirect('/');
      return;
    }

    const publicKey = fs.readFileSync('public.pem', 'utf-8');

    let data = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

    User.findOne({ _id: data._id })
      .then(data => {
        if (data) {
          req.data = data;
          let username = data.username;
          res.username = username;
          next();
        }
      })
      .catch(err => {
        console.log(err);
        res.redirect('/');
        next(err);
      });
  } catch (error) {
    console.log(error);
    res.redirect('/');
    next(error);
  }
};

const checkToken = (req, res, next) => {
  try {
    const token = req.cookies.token; // hoặc từ header, tùy thuộc vào cách bạn gửi token từ client
    if (!token) {
      throw new Error('Token not found');
    }

    const publicKey = fs.readFileSync('public.pem', 'utf-8');
    const decoded = jwt.verify(token, publicKey, { algorithms: 'RS256' });

    // Lưu thông tin người dùng vào req để sử dụng trong các xử lý tiếp theo
    req.user = decoded;
    next();
  } catch (error) {
    // res.status(401).json({ message: 'Token không hợp lệ' });
    res.redirect('/');
  }
};

function createdTokenFb(req, res, next) {
  try {
    const token = req.user.token;
    res.cookie('token', token, { secure: true, httpOnly: true });
    next();
  } catch (error) {
    res.json('Invalid Token');
  }
}

const checkAllMiddleware = (req, res, next) => {
  if (req.data.role >= 0) {
    next();
  } else {
    res.json('Not Permission!!!');
  }
};

const checkStudentMiddleware = (req, res, next) => {
  if (req.data.role >= 1) {
    next();
  } else {
    res.json('Not Permission!!!');
  }
};

const checkTeacherMiddleware = (req, res, next) => {
  if (req.data.role >= 2) {
    next();
  } else {
    res.json('Not Permission!!!');
  }
};

export {
  checkLogin,
  createdTokenFb,
  checkToken,
  checkAllMiddleware,
  checkStudentMiddleware,
  checkTeacherMiddleware,
};
