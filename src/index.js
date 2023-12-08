import express from 'express';
import Handlebars from 'handlebars';
import morgan from 'morgan';
import { engine as handlebars } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import route from './routes/index.js';
import db from './config/db/connect.js';
import sortMiddleWear from './app/middlewares/sortMiddleWear.js';
import helpersHandlebars from './helpers/handlebars.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Use cookie
app.use(cookieParser());

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
