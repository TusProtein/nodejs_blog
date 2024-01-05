import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import { engine as handlebars } from 'express-handlebars';
import session from 'express-session';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import passport from 'passport';
import { checkLogin } from './app/middlewares/authorizationMiddleWear.js';
import sortMiddleWear from './app/middlewares/sortMiddleWear.js';
import db from './config/db/connect.js';
import helpersHandlebars from './helpers/handlebars.js';
import passportFacebook from './passport/passportFacebook.js';
import passportLocal from './passport/passportLocal.js';
import route from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Use cookie
app.use(cookieParser());

// Use session
// app.use(
//   session({
//     secret: 'tusprotein', // Chìa khóa bí mật để ký session ID cookie
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
//     store: MongoStore.create({
//       mongoUrl: 'mongodb://127.0.0.1:27017/Healthy-Online-dev',
//       // ttl: 5,
//     }),
//   }),
// );

// Initialize passport
app.use(passport.initialize());
// app.use(passport.session());
passportLocal;
passportFacebook;

// Lưu thông tin người dùng vào session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Lấy thông tin người dùng từ session
// passport.deserializeUser(async (user, done) => {
//   // try {
//   //   const user = await User.findById(id);
//   //   done(null, user);
//   // } catch (error) {
//   //   done(error);
//   // }
//   done(null, user);
// });

// app.get('/getUserFacebook', checkLogin, (req, res) => {
//   // Sử dụng thông tin người dùng từ req.authenticatedUser
//   const user = req.data;
//   res.json(user);
// });

dotenv.config(); // Load biến môi trường từ file .env

// Mongoose version 6.
mongoose.set('strictQuery', false);

//Ghi đè Header PUT, DELETE
app.use(methodOverride('_method'));

//Các tệp tĩnh
app.use(express.static(path.join(__dirname, 'public')));

//Parse body request
app.use(
  express.urlencoded({
    extended: true,
  }),
);

//Connect to mongodb
db.connect();

//Parse Frameworks JS(fetch, axios,...)
app.use(express.json());

// Custom MiddleWare
app.use(sortMiddleWear);
// app.use(checkToken);

//HTTP Logger
// app.use(morgan("combined"));

//Template engines
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers: helpersHandlebars,
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route app
route(app);

app.listen(3000);
