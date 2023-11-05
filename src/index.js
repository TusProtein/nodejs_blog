import express from 'express';
import morgan from 'morgan';
import { engine as handlebars } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import route from './routes/index.js';
import db from './config/db/connect.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//Các tệp tĩnh
app.use(express.static(path.join(__dirname, 'public')));

//Parse body request
app.use(
    express.urlencoded({
        extended: true,
    })
);

//Connect to mongodb
db.connect();

//Parse Frameworks JS(fetch, axios,...)
app.use(express.json());

//HTTP Logger
// app.use(morgan("combined"));

//Template engines
app.engine('hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route app
route(app);

app.listen(3000);
